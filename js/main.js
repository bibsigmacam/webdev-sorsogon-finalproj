
const destinationsData = [
  {
    id: "subic-beach",
    name: "Subic Pink Sand Beach",
    municipality: "Matnog",
    category: "Beach",
    image: "images/50.png", 
    description: "A stunning beach famous for its unique cream-colored sand with a distinct pinkish tint from crushed red corals.",
    location: "Subic Island, Matnog, Sorsogon",
    entranceFee: "₱50.00",
    operatingHours: "24/7 (Boat schedules vary)",
    bestTime: "March to May",
    activities: "Beachcombing, swimming, camping, island hopping to nearby pristine coves.",
    tips: "Hire licensed maritime skippers exclusively via the Matnog registration desk and bring along specialized dry bags."
  },
  {
    id: "bulusan-lake",
    name: "Bulusan Lake & Volcano Park",
    municipality: "Bulusan",
    category: "Mountain",
    image: "images/52.png", 
    description: "Often dubbed the 'Switzerland of the Orient', this serene crater lake sits at the foot of Mount Bulusan.",
    location: "Bulusan Volcano Natural Park, Bulusan, Sorsogon",
    entranceFee: "₱20.00",
    operatingHours: "8:00 AM - 5:00 PM",
    bestTime: "December to May",
    activities: "Kayaking, canoeing, trekking the around-the-lake eco-trail, bird watching.",
    tips: "Arrive before 9:00 AM to encounter low-hanging mist coverage across the water surface parameters."
  },
  {
    id: "donsol-whale-sharks",
    name: "Donsol Whale Shark Interaction",
    municipality: "Donsol",
    category: "Adventure",
    image: "images/53.png", 
    description: "The whale shark capital of the world, offering sustainable, ethical swimming interactions with wild gentle giants.",
    location: "Donsol River & Sea Waters, Donsol, Sorsogon",
    entranceFee: "₱300.00 (Registration)",
    operatingHours: "6:00 AM - 2:00 PM (Whale shark trips)",
    bestTime: "February to April (Peak season)",
    activities: "Snorkeling with whale sharks, firefly watching tours along the winding Donsol River.",
    tips: "Avoid chemical sunscreens before stepping into the open interaction sea zones to shield the native ecosystems safely."
  },
  {
    id: "juag-lagoon",
    name: "Juag Lagoon Marine Sanctuary",
    municipality: "Matnog",
    category: "Island",
    image: "images/wildlife.png",
    description: "A privately protected marine sanctuary designed to preserve biological species of native fish and ocean life.",
    location: "Juag Lagoon, Matnog, Sorsogon",
    entranceFee: "₱100.00",
    operatingHours: "7:00 AM - 4:00 PM",
    bestTime: "January to June",
    activities: "Feeding giant target fish, swimming with protected marine life species responsibly.",
    tips: "Ensure cameras are linked safely onto wrist straps before initiating fish feeding actions above deep structures."
  },
  {
    id: "barcelona-church",
    name: "Barcelona Stone Church and Ruins",
    municipality: "Barcelona",
    category: "Historical Site",
    image: "images/churches.png",
    description: "Built in 1874 during Spanish colonial occupations, featuring massive stone walls composed of coral chunks and egg whites.",
    location: "National Highway, Barcelona, Sorsogon",
    entranceFee: "Free / Donations Welcome",
    operatingHours: "6:00 AM - 7:00 PM",
    bestTime: "Year-Round",
    activities: "Historical structural photography, prayer reflection, viewing seaside fortress watchtowers.",
    tips: "Step right across the street to capture panoramic visual images of the coastal defense watchtower ruins."
  }
];

// 2. INITIALIZATION EVENT RUNNERS
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("destinationsGrid")) {
    renderDestinations(destinationsData);
    setupSearchFilters();
  }
  
  if (document.getElementById("inquiryForm")) {
    setupFormValidation();
  }
});

// 3. RENDER GENERATIVE METHOD ENGINE
function renderDestinations(items) {
  const grid = document.getElementById("destinationsGrid");
  if (!grid) return;
  
  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-muted">
        <p class="fs-5 m-0">No tourist spots match your current filter parameters.</p>
      </div>`;
    return;
  }
  
  grid.innerHTML = items.map(item => `
    <div class="col">
      <div class="card h-100 border-0 shadow-sm overflow-hidden transform-hover">
        <div class="position-relative" style="height: 220px;">
          <img src="${item.image}" class="w-100 h-100 object-fit-cover" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1500624269933-91b0f5442d97?w=500&q=80'" />
          <span class="position-absolute top-0 end-0 bg-dark text-white text-uppercase fs-8 px-2 py-1 m-2 rounded opacity-75 tracking-wider fw-bold small">${item.category}</span>
        </div>
        <div class="card-body d-flex flex-column p-4">
          <span class="text-info text-uppercase tracking-wider fw-bold mb-1 small">📍 ${item.municipality}</span>
          <h4 class="fw-bold text-earth-dark mb-2 h5">${item.name}</h4>
          <p class="text-muted small flex-grow-1">${item.description}</p>
          <hr class="text-black-50 my-3" />
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <span class="small text-secondary">Fee: <strong>${item.entranceFee.split(' ')[0]}</strong></span>
            <button class="btn btn-sm btn-primary-custom px-3 py-2 text-uppercase fw-bold" onclick="triggerDetailsModal('${item.id}')">View Details</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// 4. REAL-TIME FILTER LOOPS MANAGEMENT CONTROL
function setupSearchFilters() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  
  if (!searchInput || !categoryFilter) return;

  function runFilterAction() {
    const query = searchInput.value.toLowerCase().trim();
    const activeCat = categoryFilter.value;
    
    const filtered = destinationsData.filter(item => {
      const matchQuery = item.name.toLowerCase().includes(query) || 
                         item.municipality.toLowerCase().includes(query) ||
                         item.category.toLowerCase().includes(query);
      const matchCat = (activeCat === "All") || (item.category === activeCat);
      return matchQuery && matchCat;
    });
    
    renderDestinations(filtered);
  }
  
  searchInput.addEventListener("input", runFilterAction);
  categoryFilter.addEventListener("change", runFilterAction);
}

// 5. MODAL TRIGGER PROCESSING ENGINE (Includes Safe Missing Property Verification Fallback Rule)
function triggerDetailsModal(id) {
  const target = destinationsData.find(d => d.id === id);
  if (!target) return;
  
  document.getElementById("modalTitle").innerText = target.name;
  document.getElementById("modalImage").src = target.image;
  document.getElementById("modalImage").alt = target.name;
  document.getElementById("modalMeta").innerText = `${target.category} | ${target.municipality}`;
  document.getElementById("modalDesc").innerText = target.description;
  document.getElementById("modalLocation").innerText = target.location;
  document.getElementById("modalFee").innerText = target.entranceFee;
  document.getElementById("modalHours").innerText = target.operatingHours;
  document.getElementById("modalBestTime").innerText = target.bestTime;
  
  // Safe Fallback Rule Correction Integration to defend against potential runtime array exceptions
  const targetTipsValue = target.tips || "Inquire locally at municipal ecotourism deployment units for daily logistics guidance updates.";
  document.getElementById("modalActivities").innerText = `${target.activities} Pro-Tip: ${targetTipsValue}`;
  
  const myModal = new bootstrap.Modal(document.getElementById('detailModal'));
  myModal.show();
}

// 6. GLOBAL LIGHTBOX RUNNER VIEW ENGINE
function openLightbox(src, caption) {
  document.getElementById("lightboxTargetImage").src = src;
  document.getElementById("lightboxCaption").innerText = caption;
  const lbModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
  lbModal.show();
}

// 7. SECURE INPUT FORM VALIDATOR REGEX ENGINE
function setupFormValidation() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isFormValid = true;
    
    const name = document.getElementById("formFullName");
    const email = document.getElementById("formEmail");
    const contact = document.getElementById("formContact");
    const dest = document.getElementById("formDestination");
    const date = document.getElementById("formTravelDate");
    const visitors = document.getElementById("formVisitors");
    const msg = document.getElementById("formMessage");
    
    form.classList.remove("was-validated");
    [name, email, contact, dest, date, visitors, msg].forEach(el => {
      if (el) el.classList.remove("is-invalid");
    });
    
    if (name && !name.value.trim()) { name.classList.add("is-invalid"); isFormValid = false; }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value)) { email.classList.add("is-invalid"); isFormValid = false; }
    
    const numberRegex = /^[0-9]+$/;
    if (contact && !numberRegex.test(contact.value.trim())) { contact.classList.add("is-invalid"); isFormValid = false; }
    
    if (dest && !dest.value) { dest.classList.add("is-invalid"); isFormValid = false; }
    if (date && !date.value) { date.classList.add("is-invalid"); isFormValid = false; }
    if (visitors && (parseInt(visitors.value) < 1 || isNaN(visitors.value))) { visitors.classList.add("is-invalid"); isFormValid = false; }
    if (msg && !msg.value.trim()) { msg.classList.add("is-invalid"); isFormValid = false; }
    
    if (isFormValid) {
      alert("Registration submitted successfully. The operational validation checks matching your itinerary criteria passed configuration protocols.");
      form.reset();
    } else {
      form.classList.add("was-validated");
    }
  });
}