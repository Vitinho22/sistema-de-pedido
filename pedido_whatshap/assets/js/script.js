/* ===================== CONFIG ===================== */
const WHATSAPP_NUMBER = '5511956564363'; // 55 + DDD + número
const DELIVERY_PRICE_PER_KM = 2.50;      // R$/km (simulado)
const ORIGIN_CEP = '07768-435';          // sua base (informativo para futura API)

const categories = [
  'Todos', 'Whisky', 'Cerveja', 'Refrigerantes', 'Energéticos', 'Porções', 'Lanches', 'Combos', 'Outros'
];

/* Imagens (links públicos) — fotos reais, leves e estáveis */
const catalog = [
  /* WHISKY */
  {id:'w1', cat:'Whisky', name:'Whisky Red Label 1L', desc:'Johnnie Walker Red • 1L', price:119.90, img:'assets/img/Red-label.png'},
  {id:'w2', cat:'Whisky', name:'Whisky Black Label 1L', desc:'Johnnie Walker Black • 1L', price:199.90, img:'assets/img/black-label-1l.png'},

  /* CERVEJA */
  {id:'c1', cat:'Cerveja', name:'Heineken Long Neck', desc:'Garrafa 330ml', price:9.90, img:'assets/img/2374f18a-bd6a-43d3-aa7f-e1e3e4b81fdc.png'},
  {id:'c2', cat:'Cerveja', name:'Brahma Lata', desc:'350ml', price:5.90, img:'assets/img/fbe24a47-b568-40be-bd45-f32359a01735.png'},
  {id:'c3', cat:'Cerveja', name:'Skol Lata', desc:'350ml', price:5.50, img:'assets/img/67dbd46a-8ea9-4807-80ad-0bdaac9b90a9.png'},
  {id:'c4', cat:'Cerveja', name:'Itaipava Lata', desc:'350ml', price:5.50, img:'assets/img/4cb4300a-07f7-4734-bef3-b182ff0482e6.png'},


  /* REFRIGERANTES (LATA e 2L) */
  {id:'r1', cat:'Refrigerantes', name:'Coca-Cola Lata', desc:'350ml', price:5.00, img:'assets/img/3f549012-7cf9-4cad-9335-cae3720c6887.png'},
  {id:'r2', cat:'Refrigerantes', name:'Guaraná Lata', desc:'350ml', price:5.00, img:'assets/img/55e11655-9dc9-4699-881a-e02857f40294.png'},
  {id:'r3', cat:'Refrigerantes', name:'Coca-Cola 2L', desc:'Garrafa 2 litros', price:12.00, img:'assets/img/748dc697-dc4f-40ac-b1fc-2221b04e37a4.png'},
  {id:'r4', cat:'Refrigerantes', name:'Guaraná 2L', desc:'Garrafa 2 litros', price:10.00, img:'assets/img/278892e7-635a-42be-948e-042c0cf02b4c.png'},

  /* ENERGÉTICOS */
  {id:'e1', cat:'Energéticos', name:'Red Bull', desc:'250ml', price:10.90, img:'assets/img/a2b19008-c520-4594-b201-ba0700e5b955.png'},
  {id:'e2', cat:'Energéticos', name:'Monster', desc:'473ml', price:13.90, img:'assets/img/891daaba-c17d-4117-8294-8cf654fe64c1.png'},

  /* PORÇÕES */
  {id:'p1', cat:'Porções', name:'Batata Frita', desc:'Porção média', price:20.00, img:'assets/img/9cb59363-265e-4a2f-ac68-6b2d0cc3b095.png'},
  {id:'p2', cat:'Porções', name:'Mandioca Frita', desc:'Porção média', price:18.00, img:'assets/img/092bec20-50cf-47b0-9c24-d157422f3260.png'},
  {id:'p3', cat:'Porções', name:'Calabresa Acebolada', desc:'Porção para 2', price:22.00, img:'assets/img/f53b63e2-b602-4a78-b3e3-d535df62b2b4.png'},

  /* LANCHES */
  {id:'l1', cat:'Lanches', name:'Cachorro-quente', desc:'Pão, salsicha, molhos', price:12.00, img:'assets/img/e6ae8121-6f37-42ef-9d29-6b0fec70a74e.png'},
  {id:'l2', cat:'Lanches', name:'Pastel de Carne', desc:'Massa crocante', price:9.00, img:'assets/img/0f51bb7c-e4e2-4705-b5a4-a60366bb05dd.png'},

  /* COMBOS */
  {id:'cb1', cat:'Combos', name:'Whisky + 2 Energéticos + Gelo', desc:'Informe o whisky nas observações', price:139.90, img:'assets/img/a79fe95c-069a-4452-8432-11a531cca4de.png'},

  /* OUTROS */
  {id:'o1', cat:'Outros', name:'Gelo 2kg', desc:'Saco 2kg', price:8.00, img:'assets/img/e92e2778-9cbe-4001-9b31-aefb09d1d288.png'},
  {id:'o2', cat:'Outros', name:'Copo descartável (10un)', desc:'300ml', price:6.00, img:'assets/img/d81fdfb4-b6c5-4fa1-9421-debe1f5af18a.png'},
];

/* ===================== ESTADO ===================== */
let currentCat = 'Todos';
let cart = [];
let mode = 'Entrega'; // 'Entrega' | 'Retirada'

/* ===================== UTIL ===================== */
const brl = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const $ = s=>document.querySelector(s);
const $$ = s=>Array.from(document.querySelectorAll(s));

function money(n){ return brl.format(n); }

/* ===================== RENDER ===================== */
function renderFilters(){
  const wrap = $('#filters');
  wrap.innerHTML = '';
  categories.forEach(cat=>{
    const b=document.createElement('button');
    b.className='chip'+(currentCat===cat?' active':'');
    b.textContent=cat;
    b.onclick=()=>{ currentCat=cat; renderFilters(); renderMenu(); };
    wrap.appendChild(b);
  });
}

function renderMenu(){
  const grid=$('#menu');
  grid.innerHTML='';
  const items = catalog.filter(i=> currentCat==='Todos' || i.cat===currentCat);
  items.forEach(p=>{
    const el=document.createElement('div');
    el.className='item';
    el.innerHTML=`
      <img class="photo" src="${p.img}" alt="${p.name}">
      <div style="min-width:0">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price">${money(p.price)}</div>
      </div>
      <div class="spacer"></div>
      <div class="qty">
        <button class="btn small" data-id="${p.id}" data-act="minus">−</button>
        <strong id="q-${p.id}">0</strong>
        <button class="btn plus small" data-id="${p.id}" data-act="plus">+</button>
      </div>
    `;
    grid.appendChild(el);
  });

  grid.onclick = (e)=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    const id = btn.getAttribute('data-id');
    const act = btn.getAttribute('data-act');
    const prod = catalog.find(x=>x.id===id);
    if(!prod) return;
    if(act==='plus') addToCart(prod);
    if(act==='minus') decFromCart(id);
  };

  // atualizar quantidades exibidas
  cart.forEach(ci=>{
    const q=$(`#q-${ci.id}`); if(q) q.textContent=ci.qty;
  });
}

function renderCart(){
  const list=$('#cartList');
  list.innerHTML='';
  if(cart.length===0){
    list.innerHTML='<div class="muted">Seu carrinho está vazio. Adicione itens do cardápio.</div>';
  }else{
    cart.forEach(i=>{
      const row=document.createElement('div');
      row.className='cart-item';
      row.innerHTML=`
        <div>
          <div class="name">${i.name}</div>
          <div class="muted">${money(i.price)} • cada</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn small" data-id="${i.id}" data-act="ci-minus">−</button>
          <strong>${i.qty}</strong>
          <button class="btn plus small" data-id="${i.id}" data-act="ci-plus">+</button>
        </div>
        <div><strong>${money(i.price*i.qty)}</strong></div>
        <div><button class="btn small" data-id="${i.id}" data-act="ci-rem">remover</button></div>
      `;
      list.appendChild(row);
    });

    list.onclick=(e)=>{
      const b=e.target.closest('button'); if(!b) return;
      const id=b.getAttribute('data-id'); const act=b.getAttribute('data-act');
      const it=cart.find(x=>x.id===id); if(!it) return;
      if(act==='ci-minus'){ it.qty--; if(it.qty<=0) cart=cart.filter(x=>x.id!==id); }
      else if(act==='ci-plus'){ it.qty++; }
      else if(act==='ci-rem'){ cart=cart.filter(x=>x.id!==id); }
      renderAll();
    };
  }

  updateTotals();
}

/* ===================== LÓGICA ===================== */
function addToCart(product){
  const f=cart.find(ci=>ci.id===product.id);
  if(f){ f.qty++; } else { cart.push({id:product.id,name:product.name,price:product.price,qty:1}); }
  renderAll();
}

function decFromCart(id){
  const idx=cart.findIndex(ci=>ci.id===id);
  if(idx>-1){
    cart[idx].qty--;
    if(cart[idx].qty<=0) cart.splice(idx,1);
    renderAll();
  }
}

function cartSubtotal(){
  return cart.reduce((s,i)=>s+i.price*i.qty,0);
}

function deliveryFee(){
  if(mode==='Retirada') return 0;
  const km = parseFloat($('#distance').value || '0');
  if(isNaN(km) || km<=0) return 0;
  return Math.round((km * DELIVERY_PRICE_PER_KM + Number.EPSILON) * 100)/100;
}

function updateTotals(){
  const sub=cartSubtotal();
  const fee=deliveryFee();
  $('#subtotal').textContent = money(sub);
  $('#deliveryFee').textContent = money(fee);
  $('#total').textContent = money(sub+fee);
}

function setMode(m){
  mode=m;
  // Toggle botões
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');
  const entrega=$('#btnEntrega'), retirada=$('#btnRetirada');
  entrega.style.background = (m==='Entrega') ? `linear-gradient(135deg,var(--accent),var(--accent-2))` : 'var(--surface)';
  entrega.style.color      = (m==='Entrega') ? '#fff' : 'var(--accent)';
  entrega.style.border     = (m==='Entrega') ? 'none' : '1px solid var(--accent-3)';
  retirada.style.background= (m==='Retirada') ? `linear-gradient(135deg,var(--accent),var(--accent-2))` : 'var(--surface)';
  retirada.style.color     = (m==='Retirada') ? '#fff' : 'var(--accent)';
  retirada.style.border    = (m==='Retirada') ? 'none' : '1px solid var(--accent-3)';

  // Mostrar/ocultar campos
  $('#addressField').style.display  = (m==='Entrega') ? 'flex' : 'none';
  $('#distanceField').style.display = (m==='Entrega') ? 'flex' : 'none';
  updateTotals();
}

function buildWhatsMessage(){
  const name = $('#clientName').value.trim();
  const addr = $('#address').value.trim();
  const pay  = $('#payment').value;
  const obs  = $('#notes').value.trim();
  const km   = $('#distance').value.trim();
  const sub  = cartSubtotal();
  const fee  = deliveryFee();
  const total= sub+fee;

  const itemsText = cart.map(i => `• ${i.qty}x ${i.name} — ${money(i.price*i.qty)}`).join('%0A');

  let msg = `*Novo pedido — Point 24 Horas*%0A`;
  if(name) msg += `Cliente: ${encodeURIComponent(name)}%0A`;
  msg += `Modo: ${mode}%0A`;
  if(mode==='Entrega'){
    msg += `Endereço: ${encodeURIComponent(addr||'(não informado)')}%0A`;
    msg += `Distância: ${encodeURIComponent(km||'0')} km%0A`;
  }
  msg += `%0A*Itens:*%0A${itemsText || '—'}%0A`;
  msg += `%0ASubtotal: ${money(sub)}`;
  msg += `%0ATaxa: ${money(fee)}`;
  msg += `%0A*Total: ${money(total)}*%0A`;
  msg += `Pagamento: ${encodeURIComponent(pay)}%0A`;
  if(obs) msg += `Obs.: ${encodeURIComponent(obs)}%0A`;
  msg += `%0AOrigem: ${encodeURIComponent(ORIGIN_CEP)}%0A`;
  return msg;
}

function openWhats(){
  if(cart.length===0){ alert('Seu carrinho está vazio.'); return; }
  if(mode==='Entrega'){
    if(!$('#address').value.trim()){ alert('Informe o endereço para entrega.'); return; }
  }
  if(!$('#clientName').value.trim()){ alert('Informe seu nome.'); return; }

  const text = buildWhatsMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url,'_blank');
}

/* ===================== INIT ===================== */
function renderAll(){ renderMenu(); renderCart(); updateTotals(); }

document.addEventListener('input',(e)=>{
  if(e.target.id==='distance') updateTotals();
});

$('#sendWhats').onclick = openWhats;
$('#clearCart').onclick = ()=>{ cart=[]; renderAll(); };

$('#btnEntrega').onclick = ()=> setMode('Entrega');
$('#btnRetirada').onclick= ()=> setMode('Retirada');

renderFilters();
renderAll();
setMode('Entrega'); // padrão