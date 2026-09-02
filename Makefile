run: 
	docker compose up -d --build

stop: 
	docker compose down

edit:
	vim src/pages/index.mdx

see: 
	firefox localhost:8080