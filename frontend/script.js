const surplusForm = document.getElementById("surplusForm");

function scrollToAdvisor() {
    document.getElementById("advisor").scrollIntoView({
        behavior: "smooth"
    });
}


surplusForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values entered by the farmer

    const material = document.getElementById("material").value;

    const quantity = Number(
        document.getElementById("quantity").value
    );

    const location = document.getElementById("location").value.trim();

    const condition = document.getElementById("condition").value;


    // Basic frontend validation

    if (!material || !quantity || quantity <= 0 || !location || !condition) {
        alert("Please enter all details correctly.");
        return;
    }


    // Temporary demonstration recommendations

    let recommendedUse = "Composting";
    let otherUses = ["Organic manure", "Biomass production"];
    let reason = "This material may be suitable for alternative agricultural applications.";

    if (material === "Banana Stems") {
        recommendedUse = "Banana Fiber Production";
        otherUses = [
            "Organic Compost",
            "Biodegradable Products"
        ];
        reason = "Banana stems may be processed to obtain natural fibers.";
    }

    else if (material === "Rice Straw") {
        recommendedUse = "Animal Feed (after suitability checks)";
        otherUses = [
            "Composting",
            "Mushroom Cultivation"
        ];
        reason = "Rice straw can have several agricultural and processing applications.";
    }

    else if (material === "Sugarcane Bagasse") {
        recommendedUse = "Biomass and Paper Production";
        otherUses = [
            "Composting",
            "Bio-based Products"
        ];
        reason = "Sugarcane bagasse is a fibrous by-product with possible industrial uses.";
    }

    else if (material === "Coconut Husk") {
        recommendedUse = "Coir Production";
        otherUses = [
            "Coco Peat",
            "Organic Growing Media"
        ];
        reason = "Coconut husk fibers can be used in coir-based products.";
    }

    else if (material === "Vegetable Waste") {
        recommendedUse = "Organic Composting";
        otherUses = [
            "Biogas Production",
            "Organic Manure"
        ];
        reason = "Suitable vegetable waste can be processed into useful organic resources.";
    }


    // Display sample results

    const results = document.getElementById("results");

    results.innerHTML = `

        <h3 class="result-heading">🌱 Surplus Analysis Results</h3>

        <div class="demo-notice">
            Demonstration results only. These are not verified
            buyer offers or market prices.
        </div>

        <div class="result-card">
            <h4>📋 Your Submitted Details</h4>
            <p><strong>Material:</strong> ${escapeHTML(material)}</p>
            <p><strong>Quantity:</strong> ${quantity} kg</p>
            <p><strong>Location:</strong> ${escapeHTML(location)}</p>
            <p><strong>Condition:</strong> ${escapeHTML(condition)}</p>
        </div>

        <div class="result-card">
            <h4>⭐ Recommended Alternative Use</h4>
            <p>${escapeHTML(recommendedUse)}</p>
        </div>

        <div class="result-card">
            <h4>♻️ Other Possible Uses</h4>
            <ul class="result-list">
                ${otherUses.map(use => `<li>${escapeHTML(use)}</li>`).join("")}
            </ul>
        </div>

        <div class="result-card">
            <h4>💡 Why This Recommendation?</h4>
            <p>${escapeHTML(reason)}</p>
        </div>

        <div class="result-card">
            <h4>🤝 Potential Buyers</h4>
            <p>
                Buyer matching will be available after
                backend integration.
            </p>
        </div>

        <div class="result-card">
            <h4>💰 Estimated Value</h4>
            <p>
                A verified value estimate will be available
                after backend integration.
            </p>
        </div>

    `;

});


// Prevent user-entered text from being treated as HTML

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}