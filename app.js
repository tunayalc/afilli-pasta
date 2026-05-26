// Afilli Pasta & Cafe - Premium Digital QR Menu Database and Logic (With Curated Images)

// ==================== DATABASE CONFIGURATION ====================
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabaseClient = null;
let isLiveDatabase = false;

if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY") {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isLiveDatabase = true;
  } catch (e) {
    console.error("Supabase init failed. Operating in cache mode.", e);
  }
}

let products = [
  // ==================== TATLI & PASTALAR ====================
  {
    id: "t1",
    name: "San Sebastian",
    category: "tatli",
    description: "Eşsiz akışkan kıvamı ve nefis fırın yanığı lezzetiyle, Belçika çikolatası eşliğinde sunulur.",
    price: 280,
    tag: "✨ Çok Satan",
    image: "images/san_sebastian.png"
  },
  {
    id: "t2",
    name: "Waffle",
    category: "tatli",
    description: "Taze çilek, muz ve bol Belçika çikolatası ile hazırlanan çıtır lezzet şöleni.",
    price: 250,
    tag: null,
    image: "images/waffle.png"
  },
  {
    id: "t3",
    name: "Tiramisu",
    category: "tatli",
    description: "Orijinal İtalyan espressosu ile ıslatılmış savoyer bisküvileri ve özel mascarpone kreması dokusuyla.",
    price: 250,
    tag: "✨ İmza Lezzet",
    image: "images/tiramisu.png"
  },
  {
    id: "t4",
    name: "İbiza",
    category: "tatli",
    description: "Taze çilek ve muzlu, bisküvi tabanlı hafif ve özel rulo pasta sunumuyla.",
    price: 250,
    tag: null,
    image: "images/ibiza.png"
  },
  {
    id: "t5",
    name: "Trileçe",
    category: "tatli",
    description: "Karamel, frambuaz veya Lotus seçenekleriyle sunulan, üç farklı sütle ıslatılmış hafif sütlü tatlı.",
    price: 150,
    tag: null,
    image: "images/trilece.png"
  },
  {
    id: "t6",
    name: "Magnolia",
    category: "tatli",
    description: "Muzlu, çilekli veya Oreolu seçenekleriyle, taze ev yapımı pastacı kreması katmanları ve çıtır bisküvi.",
    price: 180,
    tag: "✨ Çok Satan",
    image: "images/magnolia.png"
  },
  {
    id: "t7",
    name: "Supangle",
    category: "tatli",
    description: "Yoğun bitter çikolatalı ve kek tabanlı, geleneksel Türk tatlısı lezzeti.",
    price: 150,
    tag: null,
    image: "images/supangle.png"
  },
  {
    id: "t8",
    name: "Profiterol",
    category: "tatli",
    description: "İçi özel pastacı kreması dolgulu şu hamurları, üzerinde enfes ılık Belçika çikolatası sosuyla.",
    price: 150,
    tag: null,
    image: "images/profiterol.png"
  },
  {
    id: "t9",
    name: "Sütlaç",
    category: "tatli",
    description: "Taş fırında fırınlanmış, üzeri nar gibi kızarmış geleneksel hafif sütlü tatlı.",
    price: 150,
    tag: null,
    image: "images/sutlac.png"
  },
  {
    id: "t10",
    name: "Spoonful",
    category: "tatli",
    description: "Kaşık kaşık mutluluk veren, sıcak servis edilen akışkan yoğun çikolata dolgulu gurme tatlı.",
    price: 250,
    tag: "✨ Yeni",
    image: "images/spoonful.png"
  },
  {
    id: "t11",
    name: "Ekler (4 Adet)",
    category: "tatli",
    description: "Çikolatalı veya meyveli seçenekleriyle, çıtır çıtır şu hamuru arası enfes krema dolgusu.",
    price: 180,
    tag: null,
    image: "images/ekler.png"
  },
  {
    id: "t12",
    name: "Kurabiye (150gr)",
    category: "tatli",
    description: "Günlük taze hazırlanan, tereyağlı tatlı ve tuzlu butik kurabiye çeşitleri.",
    price: 120,
    tag: null,
    image: "images/kurabiye.png"
  },
  {
    id: "t13",
    name: "Markiz",
    category: "tatli",
    description: "Çilekli veya çikolatalı, ağızda eriyen kıvamı ile özel porsiyonluk tasarım lezzet.",
    price: 100,
    tag: null,
    image: "images/markiz.png"
  },
  {
    id: "t14",
    name: "İzmir Bomba",
    category: "tatli",
    description: "İncecik çıtır hamur içerisinde fırından yeni çıkmış, akışkan sıcak çikolata bombası.",
    price: 80,
    tag: null,
    image: "images/izmir_bomba.png"
  },
  {
    id: "t15",
    name: "Malaga",
    category: "tatli",
    description: "Taze bütün muz ve nefis krema dolgusu üzerine bol sütlü çikolata kaplamalı ve fıstıklı imza pasta.",
    price: 250,
    tag: null,
    image: "images/malaga.png"
  },

  // ==================== İÇECEKLER ====================
  {
    id: "i1",
    name: "Türk Kahvesi",
    category: "icecek",
    description: "Geleneksel bakır cezvede pişirilmiş, lokum ve su eşliğinde sunulan taze çekilmiş kahve keyfi.",
    price: 100,
    tag: null,
    image: "images/turk_kahvesi.png"
  },
  {
    id: "i2",
    name: "Menengiç Kahvesi",
    category: "icecek",
    description: "Kafeinsiz, yabani antep fıstığı (çitlembik) ağacı meyvelerinden üretilen aromatik ve sütlü lezzet.",
    price: 100,
    tag: null,
    image: "images/menengic_kahvesi.png"
  },
  {
    id: "i3",
    name: "Dibek Kahvesi",
    category: "icecek",
    description: "Havanda dövülerek hazırlanan, kakule ve çeşitli bitki karışımlarıyla zenginleştirilmiş yumuşak içimli kahve.",
    price: 100,
    tag: null,
    image: "images/dibek_kahvesi.png"
  },
  {
    id: "i4",
    name: "Americano",
    category: "icecek",
    description: "Double espresso şotunun sıcak su ile buluşması. İsteğe göre sıcak veya buzlu (soğuk) servis edilir.",
    price: 120,
    tag: null,
    image: "images/americano.png"
  },
  {
    id: "i5",
    name: "Mocha",
    category: "icecek",
    description: "Yoğun espresso, kadifemsi süt köpüğü ve eritilmiş enfes Belçika çikolatasının eşsiz uyumu.",
    price: 150,
    tag: "✨ Popüler",
    image: "images/mocha.png"
  },
  {
    id: "i6",
    name: "Cafe Latte",
    category: "icecek",
    description: "Tek şot espresso üzerine eklenen bol kadifemsi sıcak süt ve süt köpüğü. Sıcak veya soğuk tercih edilebilir.",
    price: 150,
    tag: null,
    image: "images/cafe_latte.png"
  },
  {
    id: "i7",
    name: "Espresso",
    category: "icecek",
    description: "İnce öğütülmüş kahve çekirdeklerinden yüksek basınçla demlenen yoğun ve zengin kremalı İtalyan klasiği.",
    price: 100,
    tag: null,
    image: "images/espresso.png"
  },
  {
    id: "i8",
    name: "Taze Çay",
    category: "icecek",
    description: "Doğu Karadeniz'in seçkin yapraklarından harmanlanmış, tavşan kanı demlenmiş geleneksel lezzet.",
    price: 30,
    tag: null,
    image: "images/taze_cay.png"
  },
  {
    id: "i9",
    name: "Oralet",
    category: "icecek",
    description: "Kivi, portakal veya karadut aromalı seçenekleriyle nostaljik, meyve aromalı sıcak içecek keyfi.",
    price: 30,
    tag: null,
    image: "images/oralet.png"
  },
  {
    id: "i10",
    name: "Su",
    category: "icecek",
    description: "Ferahlatıcı, berrak ve soğuk doğal kaynak suyu.",
    price: 20,
    tag: null,
    image: "images/su.png"
  },
  {
    id: "i11",
    name: "Kutu Kola / Fanta",
    category: "icecek",
    description: "Buzlu bardak ve limon dilimi eşliğinde soğuk kutu içecek seçenekleri.",
    price: 100,
    tag: null,
    image: "images/kutu_kola_fanta.png"
  },
  {
    id: "i12",
    name: "Lipton Ice Tea",
    category: "icecek",
    description: "Şeftali, limon veya mango aromalı serinletici, meyveli soğuk çay keyfi.",
    price: 100,
    tag: null,
    image: "images/lipton_ice_tea.png"
  },
  {
    id: "i13",
    name: "Maden Suyu (Soda)",
    category: "icecek",
    description: "Sade doğal maden suyu veya karadut, limon, elma gibi zengin meyve aromalı soda seçenekleri.",
    price: 30,
    tag: null,
    image: "images/maden_suyu.png"
  },
  {
    id: "i14",
    name: "Limonata",
    category: "icecek",
    description: "Taze sıkılmış nane yapraklı ev yapımı limonata veya ferahlatıcı karadut özlü özel soğuk limonata.",
    price: 100,
    tag: "✨ Ev Yapımı",
    image: "images/limonata.png"
  }
];

let currentCategory = "tatli";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  setupEventListeners();
});

async function initMenu() {
  // 1. First render using local fallback dataset (instant load)
  // Check if there are local modifications in LocalStorage (for local CEO Panel testing)
  const localData = localStorage.getItem("afilli_menu_products");
  if (localData) {
    try {
      products = JSON.parse(localData);
    } catch (e) {
      console.error("Local data parsing failed, using fallback.", e);
    }
  }
  renderProducts();

  // 2. If Supabase is active, fetch real-time cloud data
  if (isLiveDatabase && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase fetch failed, operating in cache mode.", error);
      } else if (data && data.length > 0) {
        // Overwrite active products list with live cloud database
        products = data;
        renderProducts();
      }
    } catch (e) {
      console.error("Supabase request error, using cached data.", e);
    }
  }
}

function setupEventListeners() {
  // Tab switching
  const tabs = document.querySelectorAll(".menu-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // Search input
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-search");
  
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (searchQuery.length > 0) {
        clearBtn.classList.add("visible");
      } else {
        clearBtn.classList.remove("visible");
      }
      renderProducts();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearBtn.classList.remove("visible");
      renderProducts();
      searchInput.focus();
    });
  }

  // Modals
  setupModal("contact-btn", "contact-modal", "close-contact");
  setupModal("direction-btn", "direction-modal", "close-direction");
  setupModal("qr-nav-btn", "qr-modal", "close-qr");
  setupModal("qr-view-btn", "qr-modal", "close-qr");

  // Simple feedback for hamburger menu
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarClose = document.getElementById("close-sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("active");
    });
  }

  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  }

  // Close sidebar on clicking any link inside
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  });
}

function setupModal(triggerId, modalId, closeId) {
  const trigger = document.getElementById(triggerId);
  const modal = document.getElementById(modalId);
  const close = document.getElementById(closeId);

  if (trigger && modal && close) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });

    close.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scroll
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

function renderProducts() {
  const container = document.getElementById("products-feed");
  if (!container) return;

  container.innerHTML = "";

  // Filter products by category and search query
  let filtered = products;

  if (searchQuery) {
    filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery)
    );
  } else {
    filtered = products.filter(p => p.category === currentCategory);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results animate-fade-in">
        <div class="no-results-icon">🔍</div>
        <h3>Sonuç Bulunamadı</h3>
        <p>"${searchQuery}" aramasına uygun ürün bulamadık. Lütfen farklı kelimeler deneyin.</p>
      </div>
    `;
    return;
  }

  // Group by category if searching globally
  if (searchQuery) {
    const categories = {
      tatli: { name: "🍰 Tatlı & Pastalar", items: [] },
      icecek: { name: "☕ İçecekler", items: [] }
    };

    filtered.forEach(p => {
      categories[p.category].items.push(p);
    });

    Object.keys(categories).forEach(catKey => {
      const cat = categories[catKey];
      if (cat.items.length > 0) {
        const header = document.createElement("div");
        header.className = "search-category-header";
        header.innerText = cat.name;
        container.appendChild(header);

        cat.items.forEach(p => {
          container.appendChild(createProductCard(p));
        });
      }
    });
  } else {
    // Standard rendering
    filtered.forEach(p => {
      container.appendChild(createProductCard(p));
    });
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card animate-fade-in";
  card.dataset.id = product.id;

  const tagHtml = product.tag 
    ? `<div class="product-tag"><span class="tag-badge">${product.tag}</span></div>` 
    : "";

  card.innerHTML = `
    <div class="product-info">
      ${tagHtml}
      <h3 class="product-title">${highlightText(product.name, searchQuery)}</h3>
      <p class="product-description">${highlightText(product.description, searchQuery)}</p>
      <div class="product-price">${product.price} TL</div>
    </div>
    <div class="product-image-container">
      <div class="image-skeleton"></div>
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="product-image" 
        loading="lazy"
        onload="this.previousElementSibling.classList.add('fade-out'); this.classList.add('loaded');"
      >
    </div>
  `;

  // Add click to open details modal
  card.addEventListener("click", () => {
    openProductDetails(product);
  });

  return card;
}

function highlightText(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${escapeRegExp(search)})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Interactive Details Modal
function openProductDetails(product) {
  const modal = document.getElementById("details-modal");
  const modalBody = document.getElementById("details-modal-body");
  
  if (!modal || !modalBody) return;

  const tagHtml = product.tag 
    ? `<span class="detail-tag-badge">${product.tag}</span>` 
    : "";

  modalBody.innerHTML = `
    <div class="detail-hero">
      <div class="image-skeleton"></div>
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="detail-image" 
        onload="this.previousElementSibling.classList.add('fade-out');"
      >
    </div>
    <div class="detail-content">
      <div class="detail-header">
        <h2 class="detail-title">${product.name}</h2>
        ${tagHtml}
      </div>
      <p class="detail-description">${product.description}</p>
      <div class="detail-footer">
        <div class="detail-price-label">Fiyat</div>
        <div class="detail-price-value">${product.price} TL</div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  const closeBtn = document.getElementById("close-details");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };
}
