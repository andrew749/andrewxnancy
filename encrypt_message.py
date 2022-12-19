import os
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from dataclasses import dataclass

import json

# Salts should be randomly generated

message = bytes("""
December 2022

To Nan,

I finally wrote that letter you've always asked for! I won't give you the satisfaction of seeing me fumble at rhyming a poem so a letter will have to suffice for now. At least it isn't a design doc (though maybe that's a good idea for the future 🤔). Also I made sure to get at least 1500 characters so I'm hoping that bumps my perf up this cycle, looking for a promo soon!

I've reflected over the past year to understand how my life has changed and to see if I am on track towards realizing my ideal future. Without doubt, the single largest change in my life has been you. In fact, I'm having a hard time remembering what my life was like without you in it (I promise I'm not losing my memory yet, despite what you may think!) nor can I picture an ideal future without you being a part of it. As I scroll through my photo album and reminisce, I'm constantly reminded how much our lives have become intertwined and how large of a role you play in my life.

I feel I've become a generally happier and more appreciative person. It takes a special person to make someone consistently look forward to the ordinary folds of life. That's especially true with me, given that I tend to view life through a lens of criticism, and consistently challenge what can be better, never quite being satisfied (and like me, you will never be satisfied, satisfied, satisfied). Despite this, time and time again you've made me get giddy over the smallest things, no matter how irrational it may seem. I never thought I would feel satisfied and content sitting at home, doing nothing but cooking potatoes, watching youtube lifestyle vloggers, playing with a floofy dog, wearing hello kitty pajamas and cuddling, but here we are.

Everyday I await that blue bubble arriving in my inbox before 8am (even though I don't condone judging people based on their phone preference😬). Like clockwork, it'll come and with it, a smile to my face. Even on the not-so-good days, if we're going through tough times, I can always expect a message before the start of work. This reassures me that whatever challenge we face, we'll work through it. You're the first person I talk to in the morning and the last person I talk to before bed. There's a reason for that: you help set my day up on a positive note and help me wind down from the stresses of a day by reminding me about all the good in my life by forcing me to reflect on the day, scoring it, and being mindful of the good and the bad. Most importantly, you remind me that there is a lot of life left to live and leave me looking forward to a future with you by my side, having more daily chats, video calls, sleepovers, days where we potato, unreasonably hot baths and much more than I can fit on this letter. Something I've never told you is that those talks always increase my day's rating by a solid 2.25, so 8.75s are closer to an 11.

When you stare at me with an enamored gaze, "mow"-ing, my heart warms up and reminds me how lucky I am to have someone who genuinely cares about me and loves every second spending time with me, even if I do feel my cat allergies acting up a teeny bit.

When we see each other after an extended time apart, the first hug always makes me realize what has always been waiting for me and question why I left in the first place. Though there is some weight in the saying "absence makes the heart grow fonder".

When you surprise me at home after a long day's work, I feel like a kid on Christmas, getting the present they've been longing for but had no expectations of receiving. You adopting my super optimized cooking habits are icing on the cake 😉.

When I see the scrapbook you gave me I feel like crying, not out of sadness but of happiness for knowing I've found someone who cares about me more than I ever could dream of and who knew the perfect gift without me making it easy on them. 

When we cuddle up and potato, I embrace every moment, even if I can feel the heat siphoning out of me and the onset of hypothermia as the clock ticks. You found a good way to convince me to get you more LinkedIn pants, comfy jackets and branded t-shirts.

When you mint me a new coupon to unlock what's on your mind, I feel smug knowing that I'm hoarding this collection of invaluable tickets, just like you hoard your vacation days and jewelry, that will help me get one step closer to understanding how you tick. Believe me, I like tearing stuff apart to see how it works. This whole "dating" thing has been one big struggle not being able to take a screwdriver to solve my problems so the next best thing have been your tickets.

When I wake up next to you and catch a glimpse of your racy adult stories, I can't help but giggle, knowing that you're anything but the vanilla I originally thought I ordered.

Whenever we walk and find random treasures on the side of the road, I am reminded how lucky I am to find a person who knows how to appreciate the value of a good deal, even if some stuff (cough, condoms, cough) are better left untouched.

You always ask me "How have you changed since you started dating me". I thought of a few answers to that question:
Never did I expect to look forward to hearing the tea from random people's lives like it's the storyline of a captivating tv show.
Never did I expect to find myself watching a reality tv dating show, looking forward to next week's drama and making predictions as if I had skin in the game.
Never did I expect to be singing country music karaoke in my car, knowing all the words to the songs and belting out unironically.
Never did I expect to befriend a white fluffy beast who has an appetite for flesh and be able to face it without fear of death (ok maybe still a little fear, but we're getting there!). 
Never did I expect to be waiting anxiously on someone's messages every morning and night, feeling incomplete until that familiar ding sounds.
Never did I expect to actively go into every trader joes and see if this would be the one that finally had Ghost pepper chips (sadly it probably didn't) and make do with whatever other snacks seemed interesting but familiar.
Never did I expect to buy as much boba as I have from the same spot and now actively crave it. I don't think I've ever joined a rewards program until Teaspoon, but now I have a good reason.
Never did I expect to find a person who doesn't mind eating the same highly-optimized diet that I cook, or at least pretend to like it 😬.
Never did I expect to change a faucet or trim trees and enjoy every second, despite the "quality control manager" being very stringent.
Never did I expect to find a girl who would be obsessed with scavenging rocks on a beach (ok, moonstones), having fun in the moment and not needing anything fancy to be truly happy.
Never did I expect to be actively as goofy as I have without fear of embarrassment.
Never did I expect to enjoy physical touch or words of affirmation or really any of the love languages as much as I did. Hell, I barely knew what they were before meeting you.
Never did I expect for such a small girl to be able to tear off a door handle and pack such a large punch, even if you did give up on kickboxing (yeah I didnt forget).
Never did I expect to search out gently rolling hills and find ones with ideal angles.
Never did I expect to catch a glimpse of antique stores int the corner of my eye and source that elusive 925 stamp (or really even step foot in an antique store).
Never did I ever expect to do nothing at all and be perfectly content.
Never did I expect to be writing a letter to my girlfriend this Christmas, who would be coming all the way across the continent to meet my family.

Never did I ever expect to meet a girl as incredible, loving, and irreplaceable as you. I'm glad this magpie added one more item, even if it isn't very shiny, to her collection. Words can't describe how fortunate I feel to have found someone I fall in love with over and over again.

Thank you for making my life that much more fun and sharing all these experiences with me. I truly hope that I get the opportunity to spend the rest of my life with you and that I've found my forever person.

Love you,
Your tech bro
Andrew

P.S. This letter constitutes a coupon for one (1) letter each year for the rest of our lives. May not be combined with other offers. While supplies last.
""", 'utf-8')

@dataclass
class Question:
    question: str
    answer: str

question_list = [
    Question("Where was our first date?", "teaspoon"),
    Question("Where was our first trip together?", "tahoe"),
    Question("What did you break on my car?", "handle"),
    Question("What restaurant did we eat at on our second date?", "chipotle"),
    Question("What anime hat did you get me on our third date?", "naruto"),
    Question("What did you try on our first date that you became subsequently obsessed with?", "taiyaki"),
    Question("What day of May was our first date on? (e.g. the thirteenth would be 13)", "15"),
]

# Create Key
salt = base64.b64encode(b"2022")
iv = b"0000000000000000"
key_length = 16 
pbkdf_iterations = 2000

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

with open('encrypted_letter', 'w') as f:
    f.write(base64.b64encode(bytes(ct, 'utf-8')).decode('utf-8'))
print(f"Encrypted: {base64.b64encode(bytes(ct, 'utf-8'))}")
message_decrypted = ct

message_decrypted = json.loads(ct)
index = int(message_decrypted["index"])

while index > 0:
    key = gen_key(bytes(derived_datums_list[index - 1].question.answer, 'utf-8')) 
    cipher = Cipher(algorithms.AES128(key), modes.CBC(iv))
    decryptor = cipher.decryptor()
    print(f"Processing index:{index} question:{message_decrypted['question']} password: {derived_datums_list[index - 1].question.answer}")
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