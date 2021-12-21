# Lti 1.3 Platform
Node js implementation of LTI 1.3 Platform


## Usage

IMS Tool settings:
Keyset URL: http://e8a1-92-114-82-170.ngrok.io/keys
OAuth2 URL: http://e8a1-92-114-82-170.ngrok.io/init-login
Platform OIDC Auth URL http://localhost:3000/oidc

If need to regenerate the platform keys, use https://mkjwk.org/
Key Size: 2048
Key Use: Signature
Algorithm: RS256
Show X.509: 'Yes'
and set them in /data/keys.json
if Tool runs locally,  set the Platform's public key in Tool /data/platform-registration.json

