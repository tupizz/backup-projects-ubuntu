# Aqui crio uma máquina com driver da amazon, nesse momemnto ele já cria a instancia para mim la aws ec2
docker-machine create --driver amazonec2 pukem-locacao-php

# Aqui, uma vez que eu já sei o nome da machine eu peço as credencias de enviroment 
docker-machine env pukem-locacao-php

# dou uma eval para fazer um link
eval $(docker-machine env pukem-locacao-php)

# automagicamente já estou linkado com a maquina na amazon
docker ps

# buildo e jogo para lá
docker-compose up -d --build


