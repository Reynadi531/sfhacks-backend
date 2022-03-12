docker-dev:
	docker-compose -f docker/docker-compose.dev.yaml up

docker-dev-build:
	docker-compose -f docker/docker-compose.dev.yaml up --build