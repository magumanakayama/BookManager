d_u:
	@docker compose up -d --build

d_d:
	@docker compose down

d_eb:
	@docker exec -it backend bash

d_ef:
	@docker exec -it frontend bash

d_p:
	@docker ps

start:
	@make d_u
	@make d_ef

curl_3000:
	@curl http://localhost:3000

