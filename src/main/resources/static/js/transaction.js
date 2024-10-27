const newOrderBtn = document.getElementById("newOrderBtn");
const paymentBtn = document.getElementById("paymentBtn");
const transactionBtn = document.getElementById("transactionBtn");
let variantData = [];

document.addEventListener("DOMContentLoaded", (event) => {
  loadVariants();
});

function openNewOrderModal() {
  $("#orderModal").modal("show");
}

function openPaymentModal() {
  $("#paymentModal").modal("show");
}

function startTransaction() {
  newOrderBtn.classList.remove("disabled");
  transactionBtn.classList.add("disabled");
  populateTable(variantData);
}

function loadVariants() {
  $.ajax({
    type: "get",
    url: "http://localhost:9001/api/variant",
    contentType: "application/json",
    success: function (variantResponse) {
      variantData = variantResponse.data;
    },
  }).responseText;
}

function populateTable(variants) {
  const tbody = document.getElementById("orderBody");
  tbody.innerHTML = "";

  variants.forEach((variant, index) => {
    const row = document.createElement("tr");
    row.classList.add("align-middle");

    row.innerHTML = `
          <td>
              <button class="btn btn-warning" onclick="moveToTable(this, ${variant.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
              </svg>
              </button>
          </td>
          <td >${variant.slug}</td>
          <td > <p class="fw-bold">${variant.name}</p>${variant.description}</td>
          <td >${variant.price}</td>
          <td >${variant.stock}</td>
        `;

    tbody.appendChild(row);
  });
}

function moveToTable(btn, variantId) {
  const deleteRow = btn.closest("tr");
  deleteRow.remove();

    const tbody = document.getElementById("orderTableInput");
    const inputRow = document.createElement("tr");
    inputRow.classList.add("align-middle");
    let variant = variantData.find(v => v.id === variantId);
    inputRow.innerHTML = `
          <td >
            <div class="form-outline mb-4">
                <label class="form-label" for="name">Name</label>
                <input required type="text" id="name" name="name" class="form-control" autocomplete="off" value ="${variant.name}"/>
            </div>
          </td>
          <td >${variant.price}</td>
          <td></td>
          <td >${variant.stock}</td>
          <td>
              <button class="btn btn-warning" onclick="moveToTable(this, ${variant.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
              </svg>
              </button>
          </td>
        `;

    tbody.appendChild(inputRow);
}
