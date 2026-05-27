// Afilli Pasta & Cafe - CEO Admin Panel Logic (Live Supabase & Mock Local Fallback)

// ==================== 1. DATABASE CONFIGURATION ====================
// Replace these with your actual Supabase credentials once you create your free project at supabase.com!
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabaseClient = null;
let isLiveDatabase = false;

// Attempt to initialize Supabase
if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY") {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isLiveDatabase = true;
  } catch (error) {
    console.error("Supabase connection failed, falling back to local database.", error);
  }
}

// Fallback Hardcoded Initial Dataset (Same as app.js)
const fallbackProducts = [
  { id: "t1", name: "San Sebastian", category: "tatli", description: "Eşsiz akışkan kıvamı ve nefis fırın yanığı lezzetiyle, Belçika çikolatası eşliğinde sunulur.", price: 280, tag: "✨ Çok Satan", image: "images/san_sebastian.png" },
  { id: "t2", name: "Waffle", category: "tatli", description: "Taze çilek, muz ve bol Belçika çikolatası ile hazırlanan çıtır lezzet şöleni.", price: 250, tag: null, image: "images/waffle.png" },
  { id: "t3", name: "Tiramisu", category: "tatli", description: "Orijinal İtalyan espressosu ile ıslatılmış savoyer bisküvileri ve özel mascarpone kreması dokusuyla.", price: 250, tag: "✨ İmza Lezzet", image: "images/tiramisu.png" },
  { id: "t4", name: "İbiza", category: "tatli", description: "Taze çilek ve muzlu, bisküvi tabanlı hafif ve özel rulo pasta sunumuyla.", price: 250, tag: null, image: "images/ibiza.png" },
  { id: "t5", name: "Trileçe", category: "tatli", description: "Karamel, frambuaz veya Lotus seçenekleriyle sunulan, üç farklı sütle ıslatılmış hafif sütlü tatlı.", price: 150, tag: null, image: "images/trilece.png" },
  { id: "t6", name: "Magnolia", category: "tatli", description: "Muzlu, çilekli veya Oreolu seçenekleriyle, taze ev yapımı pastacı kreması katmanları ve çıtır bisküvi.", price: 180, tag: "✨ Çok Satan", image: "images/magnolya .png" },
  { id: "t7", name: "Supangle", category: "tatli", description: "Yoğun bitter çikolatalı ve kek tabanlı, geleneksel Türk tatlısı lezzeti.", price: 150, tag: null, image: "images/supangle.avif" },
  { id: "t8", name: "Profiterol", category: "tatli", description: "İçi özel pastacı kreması dolgulu şu hamurları, üzerinde enfes ılık Belçika çikolatası sosuyla.", price: 150, tag: null, image: "images/profiterol .jpeg" },
  { id: "t9", name: "Sütlaç", category: "tatli", description: "Taş fırında fırınlanmış, üzeri nar gibi kızarmış geleneksel hafif sütlü tatlı.", price: 150, tag: null, image: "images/sutlac.png" },
  { id: "t10", name: "Spoonful", category: "tatli", description: "Kaşık kaşık mutluluk veren, sıcak servis edilen akışkan yoğun çikolata dolgulu gurme tatlı.", price: 250, tag: "✨ Yeni", image: "images/spoonful.png" },
  { id: "t11", name: "Ekler (4 Adet)", category: "tatli", description: "Çikolatalı veya meyveli seçenekleriyle, çıtır çıtır şu hamuru arası enfes krema dolgusu.", price: 180, tag: null, image: "images/ekler.png" },
  { id: "t12", name: "Kurabiye (150gr)", category: "tatli", description: "Günlük taze hazırlanan, tereyağlı tatlı ve tuzlu butik kurabiye çeşitleri.", price: 120, tag: null, image: "images/kurabiye.png" },
  { id: "t13", name: "Markiz", category: "tatli", description: "Çilekli veya çikolatalı, ağızda eriyen kıvamı ile özel porsiyonluk tasarım lezzet.", price: 100, tag: null, image: "images/markiz.png" },
  { id: "t14", name: "İzmir Bomba", category: "tatli", description: "İncecik çıtır hamur içerisinde fırından yeni çıkmış, akışkan sıcak çikolata bombası.", price: 80, tag: null, image: "images/izmir_bomba.png" },
  { id: "t15", name: "Malaga", category: "tatli", description: "Taze bütün muz ve nefis krema dolgusu üzerine bol sütlü çikolata kaplamalı ve fıstıklı imza pasta.", price: 250, tag: null, image: "images/malaga.jpeg" },
  
  { id: "i1", name: "Türk Kahvesi", category: "icecek", description: "Geleneksel bakır cezvede pişirilmiş, lokum ve su eşliğinde sunulan taze çekilmiş kahve keyfi.", price: 100, tag: null, image: "images/turk_kahvesi.png" },
  { id: "i2", name: "Menengiç Kahvesi", category: "icecek", description: "Kafeinsiz, yabani antep fıstığı (çitlembik) ağacı meyvelerinden üretilen aromatik ve sütlü lezzet.", price: 100, tag: null, image: "images/menengic_kahvesi.png" },
  { id: "i3", name: "Dibek Kahvesi", category: "icecek", description: "Havanda dövülerek hazırlanan, kakule ve çeşitli bitki karışımlarıyla zenginleştirilmiş yumuşak içimli kahve.", price: 100, tag: null, image: "images/dibek_kahvesi.png" },
  { id: "i4", name: "Americano", category: "icecek", description: "Double espresso şotunun sıcak su ile buluşması. İsteğe göre sıcak veya buzlu (soğuk) servis edilir.", price: 120, tag: null, image: "images/americano.png" },
  { id: "i5", name: "Mocha", category: "icecek", description: "Yoğun espresso, kadifemsi süt köpüğü ve eritilmiş enfes Belçika çikolatasının eşsiz uyumu.", price: 150, tag: "✨ Popüler", image: "images/mocha.jpg" },
  { id: "i6", name: "Cafe Latte", category: "icecek", description: "Tek şot espresso üzerine eklenen bol kadifemsi sıcak süt ve süt köpüğü. Sıcak veya soğuk tercih edilebilir.", price: 150, tag: null, image: "images/latte.jpg" },
  { id: "i7", name: "Espresso", category: "icecek", description: "İnce öğütülmüş kahve çekirdeklerinden yüksek basınçla demlenen yoğun ve zengin kremalı İtalyan klasiği.", price: 100, tag: null, image: "images/espresso.webp" },
  { id: "i8", name: "Taze Çay", category: "icecek", description: "Doğu Karadeniz'in seçkin yapraklarından harmanlanmış, tavşan kanı demlenmiş geleneksel lezzet.", price: 30, tag: null, image: "images/taze_cay.png" },
  { id: "i9", name: "Oralet", category: "icecek", description: "Kivi, portakal veya karadut aromalı seçenekleriyle nostaljik, meyve aromalı sıcak içecek keyfi.", price: 30, tag: null, image: "images/oralet.png" },
  { id: "i10", name: "Su", category: "icecek", description: "Ferahlatıcı, berrak ve soğuk doğal kaynak suyu.", price: 20, tag: null, image: "images/su.png" },
  { id: "i11", name: "Kutu Kola / Fanta", category: "icecek", description: "Buzlu bardak ve limon dilimi eşliğinde soğuk kutu içecek seçenekleri.", price: 100, tag: null, image: "images/kola fanat.jpg" },
  { id: "i12", name: "Lipton Ice Tea", category: "icecek", description: "Şeftali, limon veya mango aromalı serinletici, meyveli soğuk çay keyfi.", price: 100, tag: null, image: "images/lipton.jpg" },
  { id: "i13", name: "Maden Suyu (Soda)", category: "icecek", description: "Sade doğal maden suyu veya karadut, limon, elma gibi zengin meyve aromalı soda seçenekleri.", price: 30, tag: null, image: "images/maden suyu .webp" },
  { id: "i14", name: "Limonata", category: "icecek", description: "Taze sıkılmış nane yapraklı ev yapımı limonata veya ferahlatıcı karadut özlü özel soğuk limonata.", price: 100, tag: "✨ Ev Yapımı", image: "images/limonata.jpg" }
];

// Local state
let productsList = [];
let activeEditId = null;
let activeDeleteId = null;
let activeDeleteType = null; // 'product' or 'category'
let currentUploadedBase64 = null;

// Dynamic Categories
const defaultCategories = [
  { id: "tatli", name: "Tatlı & Pastalar", icon: "🍰" },
  { id: "icecek", name: "İçecekler", icon: "☕" }
];
let categoriesList = [];

function loadCategories() {
  const localCats = localStorage.getItem("afilli_menu_categories");
  if (localCats) {
    try {
      categoriesList = JSON.parse(localCats);
    } catch (e) {
      console.error("Failed to parse categories, using default.", e);
      categoriesList = [...defaultCategories];
    }
  } else {
    categoriesList = [...defaultCategories];
    saveCategories();
  }
}

function saveCategories() {
  localStorage.setItem("afilli_menu_categories", JSON.stringify(categoriesList));
}

function renderCategoryDropdown() {
  const selectEl = document.getElementById("product-category");
  if (!selectEl) return;

  selectEl.innerHTML = "";
  categoriesList.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.innerText = `${cat.icon} ${cat.name}`;
    selectEl.appendChild(opt);
  });
}

function slugify(text) {
  let trMap = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
  };
  for (let key in trMap) {
    text = text.replace(new RegExp(key, 'g'), trMap[key]);
  }
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-')         // replace spaces with -
    .replace(/-+/g, '-')          // replace multiple - with single -
    .trim();
}

// ==================== 2. INITIALIZATION & SESSION ====================
document.addEventListener("DOMContentLoaded", async () => {
  loadCategories();
  initUIStatus();
  await checkSession();
  setupEventListeners();
});

function initUIStatus() {
  const statusEl = document.getElementById("stat-connection-status");
  if (isLiveDatabase) {
    statusEl.innerHTML = `<span class="badge-live"><i class="fa-solid fa-cloud"></i> Supabase Bulut Aktif</span>`;
  } else {
    statusEl.innerHTML = `<span class="badge-offline"><i class="fa-solid fa-desktop"></i> Lokal Mod Aktif</span>`;
  }
}

async function checkSession() {
  const sessionKey = "afilli_admin_logged_in";
  let isLoggedIn = false;

  if (isLiveDatabase && supabaseClient) {
    const { data } = await supabaseClient.auth.getSession();
    isLoggedIn = !!data.session;
  } else {
    isLoggedIn = localStorage.getItem(sessionKey) === "true";
  }

  if (isLoggedIn) {
    showDashboard();
  } else {
    showLogin();
  }
}

// ==================== 3. LOGIN & OUT HANDLERS ====================
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");
  errorEl.innerText = "";

  if (isLiveDatabase && supabaseClient) {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      errorEl.innerText = "Giriş Başarısız: " + error.message;
    } else {
      showDashboard();
    }
  } else {
    // Mock Mode Credentials: ceo@afillipasta.com / 151096
    if (email === "ceo@afillipasta.com" && password === "151096") {
      localStorage.setItem("afilli_admin_logged_in", "true");
      showDashboard();
    } else {
      errorEl.innerText = "Kullanıcı adı veya şifre yanlış!";
    }
  }
}

async function handleLogout() {
  if (isLiveDatabase && supabaseClient) {
    await supabaseClient.auth.signOut();
  } else {
    localStorage.removeItem("afilli_admin_logged_in");
  }
  showLogin();
}

function showLogin() {
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("dashboard-container").classList.add("hidden");
}

async function showDashboard() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("dashboard-container").classList.remove("hidden");
  loadCategories();
  renderCategoryDropdown();
  await fetchProducts();
}

// ==================== 4. CRUD OPERATIONS ====================
async function fetchProducts() {
  if (isLiveDatabase && supabaseClient) {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      productsList = data;
    }
  } else {
    const local = localStorage.getItem("afilli_menu_products");
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed && parsed.length > 0) {
        productsList = parsed;
      } else {
        productsList = [...fallbackProducts];
        saveLocalDB();
      }
    } else {
      productsList = [...fallbackProducts];
      saveLocalDB();
    }
  }
  renderAdminProducts();
}

function saveLocalDB() {
  localStorage.setItem("afilli_menu_products", JSON.stringify(productsList));
}

function renderAdminStats() {
  const statsSection = document.querySelector(".admin-stats-section");
  if (!statsSection) return;

  statsSection.innerHTML = "";

  categoriesList.forEach(cat => {
    const count = productsList.filter(p => p.category === cat.id).length;
    let iconClass = "fa-solid fa-utensils";
    if (cat.id === "tatli") iconClass = "fa-solid fa-cookie-bite";
    else if (cat.id === "icecek") iconClass = "fa-solid fa-mug-hot";

    const card = document.createElement("div");
    card.className = "stat-card animate-fade-in";
    card.innerHTML = `
      <i class="${iconClass}"></i>
      <div>
        <h3>${cat.name}</h3>
        <p>${count} Ürün</p>
      </div>
    `;
    statsSection.appendChild(card);
  });

  // Connection status card
  const connCard = document.createElement("div");
  connCard.className = "stat-card animate-fade-in";
  const statusEl = isLiveDatabase 
    ? `<span class="badge-live"><i class="fa-solid fa-cloud"></i> Supabase Bulut Aktif</span>`
    : `<span class="badge-offline"><i class="fa-solid fa-desktop"></i> Lokal Mod Aktif</span>`;
  connCard.innerHTML = `
    <i class="fa-solid fa-database"></i>
    <div>
      <h3>Durum</h3>
      <p id="stat-connection-status">${statusEl}</p>
    </div>
  `;
  statsSection.appendChild(connCard);
}

function renderAdminProducts() {
  renderCategoryDropdown();
  renderAdminStats();

  const tablesSection = document.querySelector(".admin-tables-section");
  if (!tablesSection) return;

  tablesSection.innerHTML = "";

  categoriesList.forEach(cat => {
    const catProducts = productsList.filter(p => p.category === cat.id);
    
    const card = document.createElement("div");
    card.className = "admin-card admin-table-container animate-fade-in";
    
    const isDefault = cat.id === "tatli" || cat.id === "icecek";
    const deleteButtonHtml = !isDefault 
      ? `<button type="button" class="admin-btn-outline delete-cat-btn" onclick="openDeleteCategoryConfirm('${cat.id}')" style="background: transparent; color: var(--text-dark); border: 1px solid rgba(46, 22, 16, 0.2); font-size: 0.8rem; padding: 6px 12px; border-radius: var(--border-radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: var(--transition-smooth);" onmouseover="this.style.borderColor='var(--text-dark)'; this.style.background='rgba(46, 22, 16, 0.05)';" onmouseout="this.style.borderColor='rgba(46, 22, 16, 0.2)'; this.style.background='transparent';">
          <i class="fa-solid fa-folder-minus"></i> Kategoriyi Sil
         </button>`
      : "";

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
        <h2 class="table-title" style="margin-bottom: 0 !important; display: flex; align-items: center; gap: 8px;">
          <span>${cat.icon}</span> ${cat.name.toUpperCase()}
        </h2>
        ${deleteButtonHtml}
      </div>
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Görsel</th>
              <th>Ürün Adı</th>
              <th>Açıklama</th>
              <th>Fiyat</th>
              <th>Etiket</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody id="table-body-${cat.id}">
            <!-- Product rows in this category -->
          </tbody>
        </table>
      </div>
    `;

    tablesSection.appendChild(card);

    const tbody = document.getElementById(`table-body-${cat.id}`);
    if (catProducts.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">
          <i class="fa-regular fa-folder-open" style="font-size: 1.5rem; display: block; margin-bottom: 8px;"></i>
          Bu kategoride henüz ürün bulunmuyor.
        </td>
      `;
      tbody.appendChild(row);
    } else {
      catProducts.forEach(product => {
        const row = document.createElement("tr");
        row.dataset.id = product.id;

        const tagBadge = product.tag 
          ? `<span class="badge-tag">${product.tag}</span>` 
          : `<span class="badge-empty">Yok</span>`;

        row.innerHTML = `
          <td class="td-image">
            <img src="${product.image}" alt="${product.name}" class="table-img">
          </td>
          <td class="td-name"><strong>${product.name}</strong></td>
          <td class="td-desc"><p class="admin-desc-truncate">${product.description}</p></td>
          <td class="td-price">${product.price} TL</td>
          <td class="td-tag">${tagBadge}</td>
          <td class="td-actions">
            <button type="button" class="action-btn edit-btn" onclick="openEditModal('${product.id}')" title="Düzenle">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="action-btn delete-btn" onclick="openDeleteConfirm('${product.id}')" title="Sil">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  });
}

// ==================== 5. MODAL LOGIC ====================
function openAddModal() {
  activeEditId = null;
  document.getElementById("product-form").reset();
  document.getElementById("product-id").value = "";
  document.getElementById("product-modal-title").innerText = "Yeni Ürün Ekle";
  
  // Clear image previews
  const imgEl = document.getElementById("image-preview");
  imgEl.src = "";
  imgEl.classList.add("hidden");
  document.getElementById("preview-placeholder").classList.remove("hidden");
  currentUploadedBase64 = null;
  document.getElementById("product-form-error").innerText = "";

  openModal("product-modal");
}

function openEditModal(id) {
  const product = productsList.find(p => p.id === id);
  if (!product) return;

  activeEditId = id;
  document.getElementById("product-id").value = product.id;
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-category").value = product.category;
  document.getElementById("product-price").value = product.price;
  document.getElementById("product-tag").value = product.tag || "";
  document.getElementById("product-description").value = product.description;
  
  // Show preview of existing image
  const imgEl = document.getElementById("image-preview");
  imgEl.src = product.image;
  imgEl.classList.remove("hidden");
  document.getElementById("preview-placeholder").classList.add("hidden");
  currentUploadedBase64 = null;
  document.getElementById("product-form-error").innerText = "";
  
  document.getElementById("product-modal-title").innerText = "Ürünü Düzenle";
  openModal("product-modal");
}

function openDeleteConfirm(id) {
  const product = productsList.find(p => p.id === id);
  if (!product) return;

  activeDeleteId = id;
  activeDeleteType = "product";
  document.querySelector(".admin-confirm-content h2").innerText = "Ürünü Sil?";
  document.getElementById("confirm-delete-text").innerText = `"${product.name}" ürününü menüden kalıcı olarak silmek istediğinize emin misiniz?`;
  openModal("confirm-modal");
}

function openDeleteCategoryConfirm(catId) {
  const cat = categoriesList.find(c => c.id === catId);
  if (!cat) return;

  activeDeleteId = catId;
  activeDeleteType = "category";
  document.querySelector(".admin-confirm-content h2").innerText = "Kategoriyi Sil?";
  document.getElementById("confirm-delete-text").innerText = `"${cat.name}" kategorisini ve bu kategoriye ait tüm ürünleri silmek istediğinize emin misiniz?`;
  openModal("confirm-modal");
}

async function handleProductSave(e) {
  e.preventDefault();
  const errorEl = document.getElementById("product-form-error");
  errorEl.innerText = "";

  const name = document.getElementById("product-name").value.trim();
  const category = document.getElementById("product-category").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const tag = document.getElementById("product-tag").value || null;
  const description = document.getElementById("product-description").value.trim();
  const imageFileInput = document.getElementById("product-image-file");

  let imageUrl = "";

  // 1. Resolve Image URL
  if (currentUploadedBase64) {
    // If a new local image is chosen (Mock Mode Base64)
    imageUrl = currentUploadedBase64;
  } else if (imageFileInput.files.length > 0) {
    const file = imageFileInput.files[0];
    
    if (isLiveDatabase && supabaseClient) {
      // Live Supabase Bucket Upload
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `menu-items/${fileName}`;

      const { data, error } = await supabaseClient.storage
        .from('product-images')
        .upload(filePath, file);

      if (error) {
        errorEl.innerText = "Görsel yüklenemedi: " + error.message;
        return;
      }
      
      // Get Public URL
      const { data: publicUrlData } = supabaseClient.storage
        .from('product-images')
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    } else {
      // Local Base64 fallback (should already be covered by FileReader handler, but safety fallback)
      imageUrl = "images/san_sebastian.png";
    }
  } else if (activeEditId) {
    // Edit Mode, keeping previous image
    const existing = productsList.find(p => p.id === activeEditId);
    imageUrl = existing.image;
  } else {
    // Add mode with no image: set standard placeholder
    imageUrl = "images/san_sebastian.png";
  }

  // 2. Perform Save / DB mutation
  if (isLiveDatabase && supabaseClient) {
    if (activeEditId) {
      // Edit Mode
      const { error } = await supabaseClient
        .from("products")
        .update({ name, category, price, tag, description, image: imageUrl })
        .eq("id", activeEditId);

      if (error) {
        errorEl.innerText = "Güncelleme başarısız: " + error.message;
        return;
      }
    } else {
      // Create Mode
      const newId = category.charAt(0) + (Date.now()).toString();
      const { error } = await supabaseClient
        .from("products")
        .insert([{ id: newId, name, category, price, tag, description, image: imageUrl }]);

      if (error) {
        errorEl.innerText = "Ekleme başarısız: " + error.message;
        return;
      }
    }
  } else {
    // Mock Local Database (LocalStorage)
    if (activeEditId) {
      const idx = productsList.findIndex(p => p.id === activeEditId);
      if (idx !== -1) {
        productsList[idx] = {
          ...productsList[idx],
          name,
          category,
          price,
          tag,
          description,
          image: imageUrl
        };
      }
    } else {
      const newId = category.charAt(0) + (productsList.length + 1).toString();
      productsList.push({
        id: newId,
        name,
        category,
        price,
        tag,
        description,
        image: imageUrl
      });
    }
    saveLocalDB();
  }

  closeModal("product-modal");
  await fetchProducts();
}

async function handleDeleteProduct() {
  if (!activeDeleteId) return;

  if (activeDeleteType === "product") {
    if (isLiveDatabase && supabaseClient) {
      const { error } = await supabaseClient
        .from("products")
        .delete()
        .eq("id", activeDeleteId);

      if (error) {
        alert("Silme başarısız: " + error.message);
      }
    } else {
      productsList = productsList.filter(p => p.id !== activeDeleteId);
      saveLocalDB();
    }
  } else if (activeDeleteType === "category") {
    // Delete Category
    categoriesList = categoriesList.filter(c => c.id !== activeDeleteId);
    saveCategories();

    // Delete products under this category
    if (isLiveDatabase && supabaseClient) {
      const { error } = await supabaseClient
        .from("products")
        .delete()
        .eq("category", activeDeleteId);

      if (error) {
        alert("Kategori ürünleri silinirken hata: " + error.message);
      }
    } else {
      productsList = productsList.filter(p => p.category !== activeDeleteId);
      saveLocalDB();
    }
  }

  closeModal("confirm-modal");
  activeDeleteId = null;
  activeDeleteType = null;
  await fetchProducts();
}

// ==================== 6. IMAGE PREVIEW FILE READER ====================
function handleImageSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Maximum file size limit: 3MB
  if (file.size > 3 * 1024 * 1024) {
    alert("Hata: Seçilen dosya boyutu çok büyük (Maksimum limit: 3MB)!");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    // Show Preview
    const imgEl = document.getElementById("image-preview");
    imgEl.src = event.target.result;
    imgEl.classList.remove("hidden");
    document.getElementById("preview-placeholder").classList.add("hidden");
    
    // In Mock Mode, save Base64 data representation
    if (!isLiveDatabase) {
      currentUploadedBase64 = event.target.result;
    }
  };
  reader.readAsDataURL(file);
}

// ==================== 7. HELPER UTILS ====================
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

async function handleCategorySave(e) {
  e.preventDefault();
  const errorEl = document.getElementById("category-form-error");
  errorEl.innerText = "";

  const name = document.getElementById("category-name").value.trim();
  const icon = document.getElementById("category-icon").value.trim();

  if (!name || !icon) {
    errorEl.innerText = "Lütfen tüm alanları doldurun!";
    return;
  }

  const catId = slugify(name);
  if (!catId) {
    errorEl.innerText = "Geçersiz kategori adı!";
    return;
  }

  const existing = categoriesList.find(c => c.id === catId);
  if (existing) {
    errorEl.innerText = "Bu isimde bir kategori zaten mevcut!";
    return;
  }

  categoriesList.push({ id: catId, name, icon });
  saveCategories();

  document.getElementById("category-form").reset();
  closeModal("category-modal");
  renderCategoryDropdown();
  await fetchProducts();
}

function setupEventListeners() {
  // Forms
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("product-form").addEventListener("submit", handleProductSave);
  document.getElementById("category-form").addEventListener("submit", handleCategorySave);

  // Clicks
  document.getElementById("btn-logout").addEventListener("click", handleLogout);
  document.getElementById("btn-add-product").addEventListener("click", openAddModal);
  document.getElementById("btn-add-category").addEventListener("click", () => {
    document.getElementById("category-form").reset();
    document.getElementById("category-form-error").innerText = "";
    openModal("category-modal");
  document.getElementById("btn-confirm-delete").addEventListener("click", handleDeleteProduct);
  
  // Modal Close buttons
  document.getElementById("close-product-modal").addEventListener("click", () => closeModal("product-modal"));
  document.getElementById("btn-cancel-product").addEventListener("click", () => closeModal("product-modal"));
  document.getElementById("btn-cancel-delete").addEventListener("click", () => closeModal("confirm-modal"));
  
  document.getElementById("close-category-modal").addEventListener("click", () => closeModal("category-modal"));
  document.getElementById("btn-cancel-category").addEventListener("click", () => closeModal("category-modal"));

  // File Upload
  document.getElementById("btn-trigger-upload").addEventListener("click", () => {
    document.getElementById("product-image-file").click();
  });
  document.getElementById("product-image-file").addEventListener("change", handleImageSelect);

  // Close modals on clicking backdrop
  const modals = document.querySelectorAll(".modal-overlay");
  modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

// Attach functions to global scope for HTML inline calls
window.openEditModal = openEditModal;
window.openDeleteConfirm = openDeleteConfirm;
window.openDeleteCategoryConfirm = openDeleteCategoryConfirm;
