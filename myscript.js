// Navbar'daki aktif sayfayı belirleme
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

// İlan ekleme ve saklama
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#ilanForm");
    const ilanTable = document.querySelector("#ilanTable tbody");
    const categoryFilter = document.querySelector("#categoryFilter");

    // Eğer form varsa, ilan ekleme işlemini yap
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const ilanAdi = document.querySelector("#ilanAdi").value;
            const ilanFiyati = document.querySelector("#ilanFiyati").value;
            const ilanKategori = document.querySelector("#ilanKategori").value;

            if (ilanAdi && ilanFiyati && ilanKategori) {
                const ilanObj = { adi: ilanAdi, fiyat: ilanFiyati, kategori: ilanKategori };
                
                // LocalStorage ile ilanları sakla
                let ilanlar = JSON.parse(localStorage.getItem("ilanlar")) || [];
                ilanlar.push(ilanObj);
                localStorage.setItem("ilanlar", JSON.stringify(ilanlar));

                form.reset();
                ilanlariGoster(); // İlanları güncelle
            }
        });
    }

    // LocalStorage'den ilanları çekme ve gösterme
    function ilanlariGoster() {
        ilanTable.innerHTML = ""; // Önce tabloyu temizle
        let ilanlar = JSON.parse(localStorage.getItem("ilanlar")) || [];

        // Filtreleme işlemi
        let filteredIlanlar = ilanlar;
        if (categoryFilter && categoryFilter.value !== "all") {
            filteredIlanlar = ilanlar.filter(ilan => ilan.kategori === categoryFilter.value);
        }

        filteredIlanlar.forEach(ilan => {
            const newRow = ilanTable.insertRow();
            newRow.innerHTML = `<td>${ilan.adi}</td><td>${ilan.fiyat} TL</td><td>${ilan.kategori}</td>`;
        });
    }

    // Sayfa yüklendiğinde ilanları göster
    ilanlariGoster();

    // Eğer filtreleme dropdown menüsü varsa, değişiklikleri dinle
    if (categoryFilter) {
        categoryFilter.addEventListener("change", ilanlariGoster);
    }
});

// Araba Sürme Oyunu (Basit Versiyon)
document.addEventListener("DOMContentLoaded", () => {
    const car = document.querySelector("#car");
    let positionX = 50;

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            positionX -= 10;
        } else if (e.key === "ArrowRight") {
            positionX += 10;
        }
        car.style.left = `${positionX}px`;
    });
});
// İletişim Formu İşleme
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.querySelector("#name").value;
            const email = document.querySelector("#email").value;
            const message = document.querySelector("#message").value;

            if (name && email && message) {
                // Kullanıcının mesajını localStorage'a kaydetme
                let messages = JSON.parse(localStorage.getItem("messages")) || [];
                messages.push({ name, email, message });
                localStorage.setItem("messages", JSON.stringify(messages));

                // Formu sıfırla ve kullanıcıya onay mesajı göster
                contactForm.reset();
                alert("Mesajınız gönderildi! Teşekkürler.");
            }
        });
    }
});
