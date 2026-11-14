# docker
d_u:
	@docker compose up -d --build

d_d:
	@docker compose down

d_et:
	@docker exec -it terraform sh

d_p:
	@docker ps

# terraform
tf_init:
	@terraform init

tf_plan:
	@terraform plan

tf_apply:
	@terraform apply

# utils
start:
	@make d_u
	@make d_et

down:
	@make d_d

