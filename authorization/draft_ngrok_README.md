Install docker


Steps:

- Connect webhook to OPAL Server, a [guide](https://docs.opal.ac/getting-started/running-opal/run-opal-server/policy-repo-syncing). To make my localhost url that isn't exposed on Internet, I tunnel it with ngrok:
  - `ngrok http 7002 --domain=hamster-tough-earwig.ngrok-free.app`, a [guide](https://ngrok.com/docs/getting-started/) to get started. I created a static domain.
  - `docker-compose -f docker-compose-tunneling.yml -p example-quote-app-tunneling up`
  - Write down your [Ngrok token](https://dashboard.ngrok.com/get-started/your-authtoken) in `.env`, and update the Ngrok env file location to `.env` on `docker-compose.yml`
- `docker-compose -f docker-compose-opal.yml -p example-quote-app-cedar up`.
