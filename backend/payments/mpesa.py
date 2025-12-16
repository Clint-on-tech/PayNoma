# payments/mpesa.py
import requests
from requests.auth import HTTPBasicAuth
from decouple import config
import base64
from datetime import datetime
import time

CONSUMER_KEY = config('MPESA_CONSUMER_KEY', default='')
CONSUMER_SECRET = config('MPESA_CONSUMER_SECRET', default='')
SHORTCODE = config('MPESA_SHORTCODE', default='')
PASSKEY = config('MPESA_PASSKEY', default='')
CALLBACK_URL = config('MPESA_CALLBACK_URL', default='https://example.com/api/payments/mpesa-callback/')
BASE_URL = config('MPESA_BASE_URL', default='https://sandbox.safaricom.co.ke')

# simple in-memory token cache (dev only)
_token_cache = {'token': None, 'expires_at': 0}

def get_access_token():
    now = time.time()
    if _token_cache['token'] and now < _token_cache['expires_at']:
        return _token_cache['token']

    url = f"{BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
    r = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET), timeout=10)
    r.raise_for_status()
    data = r.json()
    token = data.get('access_token')
    expires_in = data.get('expires_in', 3600)
    _token_cache['token'] = token
    _token_cache['expires_at'] = now + int(expires_in) - 60
    return token

def lipa_na_mpesa(tenant_phone, amount, account_reference, transaction_desc):
    """
    Initiate STK Push (CustomerPayBillOnline). Returns MPESA response dict.
    """
    access_token = get_access_token()
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode(f"{SHORTCODE}{PASSKEY}{timestamp}".encode()).decode()

    payload = {
        "BusinessShortCode": SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": int(float(amount)),
        "PartyA": str(tenant_phone),
        "PartyB": SHORTCODE,
        "PhoneNumber": str(tenant_phone),
        "CallBackURL": CALLBACK_URL,
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc
    }

    headers = {"Authorization": f"Bearer {access_token}"}
    r = requests.post(f"{BASE_URL}/mpesa/stkpush/v1/processrequest", json=payload, headers=headers, timeout=15)
    r.raise_for_status()
    return r.json()
