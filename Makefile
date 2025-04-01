.PHONY: dev build docker clean

dev:
	npm run dev

build:
	npm run build

docker:
	docker build -t ft_transcendence_frontend .
	docker run -p 8080:80 ft_transcendence_frontend

clean:
	rm -rf dist node_modules
	docker system prune -f
