# dependance
    -   express
    - after running connect to ngrok
    - then go to repository -> settings -> webhook -> in  Payload URL *  set link ngrok and in  Content type *  application/json
    - first must clone the repository in folder app and change path in app.js
# challenge in ubuntu
If you haven't problem in password and must write it, the safest and most reliable approach is to configure sudo to allow your user to run specific commands without a password.

Open the Sudoers File:

Run:

    sudo visudo

Add the Following Line:
Replace /usr/local/bin/docker-compose with the actual path to your docker-compose executable if it's located elsewhere.

    your_username ALL=(ALL) NOPASSWD: /path/to/docker-compose
        example:
            mena ALL=(ALL) NOPASSWD: /usr/bin/docker