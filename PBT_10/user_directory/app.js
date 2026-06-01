const api = {
  baseURL: "https://jsonplaceholder.typicode.com",

  async getUsers() {
    const res = await fetch(this.baseURL + "/users");
    if (!res.ok) throw new Error("Không tải được danh sách users");
    return await res.json();
  },

  async getUser(id) {
    const res = await fetch(this.baseURL + "/users/" + id);
    if (!res.ok) throw new Error("Không tải được user");
    return await res.json();
  },

  async createUser(data) {
    const res = await fetch(this.baseURL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Không tạo được user");
    return await res.json();
  },

  async updateUser(id, data) {
    const res = await fetch(this.baseURL + "/users/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Không cập nhật được user");
    return await res.json();
  },

  async deleteUser(id) {
    const res = await fetch(this.baseURL + "/users/" + id, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Không xóa được user");
    return true;
  },
};

const userForm = document.querySelector("#userForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const submitBtn = document.querySelector("#submitBtn");
const searchInput = document.querySelector("#searchInput");
const userList = document.querySelector("#userList");
const loading = document.querySelector("#loading");
const toast = document.querySelector("#toast");

let users = [];
let editingId = null;

const ui = {
  renderUsers(userArray) {
    userList.textContent = "";

    for (let i = 0; i < userArray.length; i++) {
      const user = userArray[i];

      const card = document.createElement("div");
      card.classList.add("user-card");

      const name = document.createElement("h3");
      name.textContent = user.name;

      const email = document.createElement("p");
      email.textContent = "Email: " + user.email;

      const phone = document.createElement("p");
      phone.textContent = "Phone: " + user.phone;

      const actions = document.createElement("div");
      actions.classList.add("actions");

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.textContent = "Edit";
      editBtn.dataset.id = user.id;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete";
      deleteBtn.dataset.id = user.id;

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      card.appendChild(name);
      card.appendChild(email);
      card.appendChild(phone);
      card.appendChild(actions);

      userList.appendChild(card);
    }
  },

  showLoading() {
    loading.classList.remove("hidden");
    userList.classList.add("hidden");
  },

  hideLoading() {
    loading.classList.add("hidden");
    userList.classList.remove("hidden");
  },

  showError(message) {
    toast.textContent = message;
    toast.className = "toast error";

    setTimeout(function () {
      toast.className = "toast hidden";
    }, 2500);
  },

  showSuccess(message) {
    toast.textContent = message;
    toast.className = "toast success";

    setTimeout(function () {
      toast.className = "toast hidden";
    }, 2500);
  },
};

async function loadUsers() {
  try {
    ui.showLoading();
    users = await api.getUsers();
    ui.renderUsers(users);
  } catch (error) {
    ui.showError(error.message);
  } finally {
    ui.hideLoading();
  }
}

function resetForm() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  editingId = null;
  submitBtn.textContent = "Add User";
}

userForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
  };

  try {
    if (editingId === null) {
      const newUser = await api.createUser(data);
      newUser.id = Date.now();
      users.unshift(newUser);
      ui.showSuccess("Thêm user thành công");
    } else {
      const updatedUser = await api.updateUser(editingId, data);

      users = users.map(function (user) {
        if (user.id === editingId) {
          return {
            ...user,
            ...updatedUser,
            id: editingId,
          };
        }

        return user;
      });

      ui.showSuccess("Cập nhật user thành công");
    }

    resetForm();
    ui.renderUsers(users);
  } catch (error) {
    ui.showError(error.message);
  }
});

userList.addEventListener("click", async function (e) {
  const editBtn = e.target.closest(".edit-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (editBtn) {
    const id = Number(editBtn.dataset.id);
    const user = users.find(function (item) {
      return item.id === id;
    });

    editingId = id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    phoneInput.value = user.phone;
    submitBtn.textContent = "Update User";
  }

  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);

    const confirmDelete = confirm("Bạn có chắc muốn xóa user này không?");
    if (!confirmDelete) return;

    try {
      await api.deleteUser(id);

      users = users.filter(function (user) {
        return user.id !== id;
      });

      ui.renderUsers(users);
      ui.showSuccess("Xóa user thành công");
    } catch (error) {
      ui.showError(error.message);
    }
  }
});

searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.toLowerCase();

  const filteredUsers = users.filter(function (user) {
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
  });

  ui.renderUsers(filteredUsers);
});

loadUsers();
