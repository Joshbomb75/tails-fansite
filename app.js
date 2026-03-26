const DATA_URL = "./data/tails-variants.json";

const siteTitle = document.getElementById("siteTitle");
const siteTagline = document.getElementById("siteTagline");
const variantNav = document.getElementById("variantNav");
const variantSelect = document.getElementById("variantSelect");
const variantCard = document.getElementById("variantCard");
const variantTemplate = document.getElementById("variantTemplate");

let state = {
  variants: [],
  activeId: null,
};

async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Failed to load data (${response.status})`);

    const data = await response.json();
    const variants = data.variants || [];

    if (!variants.length) {
      renderError("No variants found in JSON data.");
      return;
    }

    state.variants = variants;
    state.activeId = variants[0].id;

    siteTitle.textContent = data.site?.title || "Tails Variants";
    siteTagline.textContent = data.site?.tagline || "Explore different versions of Tails.";

    renderNav();
    renderSelect();
    renderCard(state.activeId);
  } catch (error) {
    console.error(error);
    renderError("Could not load the Tails data. Run this site with a local server and try again.");
  }
}

function renderNav() {
  variantNav.innerHTML = "";

  state.variants.forEach((variant) => {
    const btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.type = "button";
    btn.textContent = variant.shortLabel || variant.name;
    btn.setAttribute("aria-label", `View ${variant.name}`);

    if (variant.id === state.activeId) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => setActiveVariant(variant.id));
    variantNav.appendChild(btn);
  });
}

function renderSelect() {
  variantSelect.innerHTML = "";

  state.variants.forEach((variant) => {
    const option = document.createElement("option");
    option.value = variant.id;
    option.textContent = variant.name;
    option.selected = variant.id === state.activeId;
    variantSelect.appendChild(option);
  });

  variantSelect.addEventListener("change", (event) => {
    setActiveVariant(event.target.value);
  });
}

function setActiveVariant(id) {
  state.activeId = id;
  renderNav();
  renderCard(id);
  variantSelect.value = id;
}

function renderCard(id) {
  const variant = state.variants.find((entry) => entry.id === id);
  if (!variant) return;

  const fragment = variantTemplate.content.cloneNode(true);

  const image = fragment.querySelector(".variant-image");
  image.src = variant.image;
  image.alt = variant.imageAlt || variant.name;

  fragment.querySelector(".variant-name").textContent = variant.name;
  fragment.querySelector(".continuity").textContent = variant.continuity;
  fragment.querySelector(".meta").textContent = `Debut: ${variant.debut}`;
  fragment.querySelector(".bio").textContent = variant.bio;
  fragment.querySelector(".appearance").textContent = variant.appearanceDiff;
  fragment.querySelector(".media").textContent = variant.media;

  const traitsEl = fragment.querySelector(".traits");
  variant.traits.forEach((trait) => {
    const li = document.createElement("li");
    li.textContent = trait;
    traitsEl.appendChild(li);
  });

  const linksEl = fragment.querySelector(".links");
  variant.links.forEach((link) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = link.label;
    li.appendChild(a);
    linksEl.appendChild(li);
  });

  variantCard.replaceChildren(fragment);
}

function renderError(message) {
  variantCard.innerHTML = `
    <div style="padding: 24px; color: #ffd6aa; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; background: rgba(0,0,0,.15)">
      <strong>Oops:</strong> ${message}
    </div>
  `;
}

init();
