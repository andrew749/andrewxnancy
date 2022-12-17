import os
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding

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

passwords = [b"teaspoon", b"tahoe"]

# Create Key
salt = base64.b64encode(b"2022")
iv = b"0000000000000000"
key_length = 16 
pbkdf_iterations = 2

def gen_key(password):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=key_length,
        salt=salt,
        iterations=pbkdf_iterations,
    )
    return kdf.derive(password)
derived_keys = map(gen_key, passwords)


# for password, derived_key in zip(passwords, derived_keys):
#     kdf = PBKDF2HMAC(
#         algorithm=hashes.SHA256(),
#         length=key_length,
#         salt=salt,
#         iterations=pbkdf_iterations,
#     )
#     kdf.verify(password, derived_key)

ct = message

# multistage encryption
derived_keys_list = list(derived_keys)
for index, key in enumerate(derived_keys_list):
    print(f"Encrypting with key {key}")
    cipher = Cipher(algorithms.AES128(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    m = {
        "index": index,
        "encoded": base64.b64encode(ct).decode("utf-8"),
    }
    encoded_json = json.dumps(m)
    padder = padding.PKCS7(128).padder()
    message_encoded = padder.update(bytes(encoded_json, "utf-8")) + padder.finalize()
    ct = encryptor.update(message_encoded) + encryptor.finalize()

print(f"Encrypted: {base64.b64encode(ct)}")
message_decrypted = ct
for key in derived_keys_list[::-1]:
    cipher = Cipher(algorithms.AES128(key), modes.CBC(iv))
    decryptor = cipher.decryptor()
    message_decrypted = decryptor.update(message_decrypted) + decryptor.finalize()
    unpadder = padding.PKCS7(128).unpadder()
    message_decrypted = unpadder.update(message_decrypted) + unpadder.finalize()
    message = json.loads(message_decrypted.decode('utf-8'))
    if (message['index'] > 0):
        message_decrypted = base64.b64decode(message['encoded'])
    else:
        message_decrypted = json.loads(message_decrypted.decode('utf-8'))['encoded']

print(f"Decrypted: {base64.b64decode(message_decrypted)}")