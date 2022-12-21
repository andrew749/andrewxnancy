import os
import sys
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from dataclasses import dataclass

import json

output_path = "public/letters/"
input_path = "letters/"

print("Letter path on disk:")
letter_file = sys.argv[1]

output_file = os.path.join(output_path, letter_file)
input_file = os.path.join(input_path, letter_file)

with open(input_file, 'r') as f:
    message = bytes("\n".join(f.readlines()), 'utf-8')


@dataclass
class Question:
    question: str
    answer: str

question_list = [
    Question("Where did we meet on our first date? (hint: the first store)", "teaspoon"),
    Question("Where was our first trip together?", "tahoe"),
    Question("What app did we meet on?", "hinge"),
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

with open(output_file, 'w') as f:
    f.write(base64.b64encode(bytes(ct, 'utf-8')).decode('utf-8'))
# print(f"Encrypted: {base64.b64encode(bytes(ct, 'utf-8'))}")
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

# print(f"Decrypted: {message_decrypted}")