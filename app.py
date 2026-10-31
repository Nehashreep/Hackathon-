from flask import Flask, request, jsonify
from flask_cors import CORS

from sample_data import materials, buyers

# Initialize Flask application
app = Flask(__name__)

# Enable frontend-backend communication
CORS(app)


# Home route
@app.route('/')
def home():

    return jsonify({
        "message": "Surplus Value Advisor Backend is Running!"
    })


# API to get available materials
@app.route('/api/materials', methods=['GET'])
def get_materials():

    return jsonify(list(materials.keys()))


# API to analyze agricultural surplus
@app.route('/api/analyze', methods=['POST'])
def analyze():

    # Receive data from frontend
    data = request.get_json(silent=True) or {}

    material = str(data.get('material', '')).strip().lower()
    location = str(data.get('location', '')).strip()
    quantity = data.get('quantity')

    # Validate input
    if not material or not location or quantity is None:

        return jsonify({
            "error": "Please provide material, quantity and location"
        }), 400

    try:

        quantity = float(quantity)

        if quantity <= 0:
            raise ValueError()

    except (ValueError, TypeError):

        return jsonify({
            "error": "Quantity must be a positive number"
        }), 400

    # Check whether material exists
    if material not in materials:

        return jsonify({
            "error": "Material not found"
        }), 404

    # Get alternative uses
    recommendations = materials[material]

    # Find matching buyers
    matching_buyers = []

    for buyer in buyers:

        if buyer["material"] == material:

            estimated_value = quantity * buyer["price"]

            matching_buyers.append({

                "name": buyer["name"],
                "location": buyer["location"],
                "price_per_kg": buyer["price"],
                "estimated_value": round(estimated_value, 2),

                "local_match":
                    buyer["location"].lower() == location.lower()

            })

    # Rank buyers
    matching_buyers.sort(
        key=lambda b: (
            not b["local_match"],
            -b["price_per_kg"]
        )
    )

    # Send results
    return jsonify({

        "material": material,
        "quantity": quantity,
        "location": location,

        "recommendations": recommendations,

        "buyers": matching_buyers,

        "message": "Analysis completed successfully",

        "disclaimer": "Buyers and prices are fictional sample data."

    })


# Run backend server
if __name__ == '__main__':

    app.run(debug=True, port=5000)