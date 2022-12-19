import os
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from dataclasses import dataclass

import json

# Salts should be randomly generated

message = b"""
December 2022

To Nan,

I finally got to write that letter you've always asked for. I won't give you the satisfaction of seeing me fumble at writing a rhyming poem so a letter will have to do for now. At least it isn't a design doc (though maybe that's a good idea for the future :P). Anyways . . . 

I've reflected over the last year quite a bit to understand how my life has changed. Undoubtedly, the single largest change in my life has been you. I'm having a hard time remembering what my life was like without you in it and I'm blanking (I promise I'm not losing my memory yet, despite what you may think!). 

I feel I've become a generally happier and more appreciative person. It takes a special person to make someone consistently look forward to the ordinary folds of life. That's especially true with me, given that I generally tend to view life through a lens of criticism  and consistently challenge what can be better. Despite this, time and time again you've made me get giddy over the smallest things, no matter how irrational it may seem. I never thought I would feel satisfied sitting at home, doing nothing but cooking potatoes and watching youtube but here we are.

When I get that notification around 7:30-7:45am I feel like smiling. Even on the not-so-good days, I can always expect a message before the start of work. You're the first person I talk to in the morning and the last person I talk to before bed. There's a reason for that: you help set my day up on a positive note and help me wind down from the stresses of a day by reminding me about all the good in my life by forcing me to reflect on the day being mindful of the good and the bad. Most importantly, you remind me that there is a lot of life left to live and leave me looking forward to a future with you, having more daily chats for the rest of our lives. Something I've never told you is that those talks always increase my days rating by a solid .75 (lets round it up to 1) so I very well could have broken the scale and seen a couple 11s.

When you stare at me with an enamored gaze and mow, my heart warms up and reminds me how lucky I am to have someone who cares about me.

When we see each other after an extended time away, the first hug always makes me realize what has always been waiting for me and question why I left in the first place.

When you surprise me at home after a long day's work,  I feel like a kid again on Christmas, getting the present they've been longing for but had no expectations of receiving.

When I see the scrapbook you gave me I feel like crying, not out of sadness but of happiness for knowing I've found someone who cares not about me unconditionally. 

When we cuddle up and potato, I appreciate, even if I can feel the heat siphoned out


You always ask me "How have you changed since you met me". I thought of a few answers to that question:
Never did I expect to look forward to hearing the tea from random people's lives.
Never did I expect to find myself watching a reality tv dating show, looking forward to next week's drama and making predictions.
Never did I ever expect to do nothing at all and be perfectly content.
Never did I expect to be singing country music karaoke in my car.
Never did I expect to befriend a white fluffy beast which had an appetite for flesch and be able to face it without fear of death (ok maybe still a little fear). 
Never did I expect to be waiting anxiously on someone's messages every morning and night, feeling incomplete until those bytes make it over the network.
Never did I expect to be writing a letter to my girlfriend this Christmas, who would be coming all the way across the continent to meet my family.

Never did I ever expect to meet a girl as incredible as you. I'm glad this magpie added one more not-so-shiny item to its collection.

Thank you for making my life that much more fun and sharing all these experiences with me.

Love you,
Your tech bro
Andrew

P.S. You have permission from past Andrew to demand your letter from future Andrew if he ever misses one.

"""

@dataclass
class Question:
    question: str
    answer: str

question_list = [
    Question("Where was our first date?", "teaspoon"),
    Question("Where was our first trip together?", "tahoe"),
    Question("What did you break on my car?", "handle"),
]

# Create Key
salt = base64.b64encode(b"2022")
iv = b"0000000000000000"
key_length = 16 
pbkdf_iterations = 2

def gen_key(password: str):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=key_length,
        salt=salt,
        iterations=pbkdf_iterations,
    )
    return kdf.derive(password)

@dataclass
class DatumEncryptConfig:
    """
    Config for a specific datum that is needed to generate a record for encryption.
    """
    question: Question
    key: str

def gen_datum(question: Question):
    return DatumEncryptConfig(question=question, key = gen_key(bytes(question.answer, 'utf-8')))

derived_datums = map(gen_datum, question_list)

# First packet with unencrypted contents
ct = json.dumps({
    "index": 0,
    "answer": base64.b64encode(message).decode("utf-8")
})

# multistage encryption
derived_datums_list = list(derived_datums)

for index, datum in enumerate(derived_datums_list):
    key = datum.key
    print(f"Encrypting with key {key}")
    cipher = Cipher(algorithms.AES128(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    padder = padding.PKCS7(128).padder()

    ct = base64.b64encode(bytes(ct, 'utf-8'))
    message_encoded = padder.update(ct) + padder.finalize()
    ct = encryptor.update(message_encoded) + encryptor.finalize()
    ct = json.dumps({
        "index": index + 1,
        "question": datum.question.question,
        "encoded": base64.b64encode(ct).decode("utf-8"),
    })

print(f"Encrypted: {base64.b64encode(bytes(ct, 'utf-8'))}")
message_decrypted = ct

message_decrypted = json.loads(ct)
index = int(message_decrypted["index"])

while index > 0:
    key = derived_datums_list[index - 1].key 
    cipher = Cipher(algorithms.AES128(key), modes.CBC(iv))
    decryptor = cipher.decryptor()
    print(f"Processing index {index} {message_decrypted['question']}")
    message_decrypted = decryptor.update(base64.b64decode(message_decrypted["encoded"])) + decryptor.finalize()
    unpadder = padding.PKCS7(128).unpadder()
    message_decrypted = unpadder.update(message_decrypted) + unpadder.finalize()
    message = json.loads(base64.b64decode(message_decrypted))
    index = message["index"]
    if (index > 0):
        message_decrypted = message
    else:
        message_decrypted = base64.b64decode(message["answer"])

print(f"Decrypted: {message_decrypted}")