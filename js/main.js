loadProducts()
function createProductElem(product){
    let productStr = ` <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="...">
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${product.name}</h5>
                        $${product.price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center" ><a data-id="${product.id}" class="btn btn-outline-dark mt-auto " href="#">View options</a></div>
                </div>
            </div>
        </div>`
        return productStr;
}
function loadProducts() {

    let productsBox = document.querySelector("#productsBox");
    console.log(productsBox)
    fetch("http://localhost:56620/products")
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                let productElem = createProductElem(product)

                productsBox.innerHTML += productElem;
            });
        })
}

document.querySelector(".modal-body form").addEventListener("submit", function(event){
    event.preventDefault(); 

    const productName = document.getElementById("exampleInputName1").value;
    const productPrice = document.getElementById("exampleInputPrice").value;


    const productData = {
        name: productName,
        price: productPrice

    };

    fetch("http://localhost:56620/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(result => {

        console.log("Product added successfully:", result);

    })
    .catch(error => {
        console.error("Error adding product:", error);

    });

    document.getElementById("exampleInputName1").value = "";
    document.getElementById("exampleInputPrice").value = "";
});
