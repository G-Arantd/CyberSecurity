from flask import jsonify, request
from app import app
from app.service.votes_services import create

# Lista global para armazenar os IPs dos usuários que já votaram
voted_ips = []

@app.route('/votes', methods=['POST'])
def create_vote():
    try:
        data = request.get_json()

        name = data.get('name')
        vote = data.get('vote')

        # Obter o IP do usuário
        user_ip = request.remote_addr

        print(user_ip in voted_ips)

        # Verificar se o IP já votou
        if user_ip in voted_ips:
            return jsonify({"message": "Você já votou!"}), 200

        # Se o IP não votou, permite o voto
        votes = create(name, vote)

        # Adiciona o IP à lista de IPs que já votaram
        voted_ips.append(user_ip)

        return jsonify({"message": "Seu voto foi computado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
