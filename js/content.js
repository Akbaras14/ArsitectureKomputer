/** Static learning content. Diagrams and numbers below are conceptual teaching models. */
export const modules = [
  {
    id: 1, title: 'Pengantar Arsitektur dan Organisasi Komputer', short: 'Pengantar Arsitektur Komputer', icon: 'book', minutes: 10,
    summary: 'Pahami gambaran besar sistem komputer dan bagaimana setiap bagiannya bekerja bersama.',
    objectives: ['Membedakan arsitektur dan organisasi komputer.', 'Menjelaskan alur input, proses, output, dan penyimpanan.'],
    sections: [
      ['Satu sistem, banyak komponen', 'Komputer adalah sistem yang menerima masukan (input), menjalankan instruksi untuk mengolahnya, menghasilkan keluaran (output), dan menyimpan informasi. Perangkat keras menjalankan pekerjaan ini bersama perangkat lunak, yaitu kumpulan instruksi yang mengarahkan komputer.'],
      ['Arsitektur menentukan apa', 'Arsitektur komputer mencakup atribut sistem yang terlihat oleh programmer, seperti kumpulan instruksi, register yang dapat diakses program, tipe data, dan aturan pengalamatan memori. Instruction Set Architecture (ISA) adalah kontrak antara perangkat lunak dan perangkat keras.'],
      ['Organisasi menjelaskan bagaimana', 'Organisasi komputer menjelaskan cara unit perangkat keras mewujudkan arsitektur: susunan unit pemroses, jalur data, sinyal kontrol, dan teknologi memori. Dua prosesor dapat menjalankan ISA yang sama walaupun organisasi internal, cache, dan kinerjanya berbeda.'],
      ['Komponen saling bergantung', 'Motherboard menghubungkan CPU, RAM, penyimpanan, dan perangkat I/O. CPU menjalankan instruksi, RAM menampung data aktif, dan SSD menyimpan data jangka panjang. PSU memasok daya, sedangkan pendingin memindahkan panas agar sistem dapat beroperasi stabil.']
    ],
    example: 'Saat mengetik huruf A, keyboard mengirim input. Sistem operasi dan aplikasi memproses kejadian itu memakai CPU dan RAM. GPU membantu menampilkan huruf di layar. Saat dokumen disimpan, datanya ditulis ke penyimpanan.',
    diagram: ['Input: keyboard mengirim kejadian tombol', 'Process: CPU menjalankan aplikasi dengan data di RAM', 'Output: layar menampilkan huruf', 'Storage: SSD menyimpan dokumen'],
    extra: 'ISA yang sama tidak berarti dua prosesor memiliki kecepatan yang sama. Organisasi internal, frekuensi, sistem memori, dan beban kerja memengaruhi waktu eksekusi.'
  },
  {
    id: 2, title: 'Representasi Data dan Sistem Bilangan', short: 'Data dan Sistem Bilangan', icon: 'code', minutes: 12,
    summary: 'Temukan bagaimana angka, teks, dan informasi direpresentasikan sebagai bit.',
    objectives: ['Mengonversi bilangan biner sederhana ke desimal.', 'Membedakan bit, byte, dan pengodean karakter.'],
    sections: [
      ['Bit adalah unit dasar', 'Bit menyatakan satu dari dua nilai, 0 atau 1. Delapan bit membentuk satu byte. Pola bit tidak memiliki makna tunggal: perangkat lunak menentukan apakah pola itu adalah angka, karakter, warna, atau instruksi.'],
      ['Biner menggunakan pangkat dua', 'Sistem desimal berbasis sepuluh, sedangkan biner berbasis dua. Dari kanan ke kiri, bobot digit biner adalah 1, 2, 4, 8, 16, dan seterusnya. Nilai 1010₂ adalah 1×8 + 0×4 + 1×2 + 0×1 = 10₁₀.'],
      ['Heksadesimal mempersingkat pola bit', 'Heksadesimal berbasis enam belas, dengan digit 0 sampai 9 dan A sampai F. Satu digit heksadesimal mewakili empat bit. Pola 1111₂ adalah F₁₆, sedangkan 11111111₂ adalah FF₁₆ atau 255₁₀.'],
      ['Teks dan bilangan bertanda', 'Unicode memberikan kode bagi karakter, sementara UTF-8 mengodekannya menjadi byte. Satu karakter tidak selalu satu byte. Untuk bilangan negatif, representasi komplemen dua umum digunakan; jumlah bit membatasi rentang nilai yang dapat direpresentasikan.']
    ],
    example: 'Dalam 8 bit tanpa tanda, 00001101₂ bernilai 8 + 4 + 1 = 13. Rentangnya 0 sampai 255. Dalam 8 bit komplemen dua, rentangnya −128 sampai 127. Karena itu, pola bit harus dibaca bersama aturan representasinya.',
    diagram: ['Pola bit: 0000 1101', 'Bobot aktif: 8 + 4 + 1', 'Nilai desimal: 13', 'Heksadesimal: 0D'],
    extra: 'kB umumnya berarti 1.000 byte, sedangkan KiB berarti 1.024 byte. Keduanya berbeda; jangan menganggap semua label kapasitas memakai basis yang sama.'
  },
  {
    id: 3, title: 'Struktur dan Fungsi CPU', short: 'Struktur dan Fungsi CPU', icon: 'chip', minutes: 12,
    summary: 'Kenali ALU, Control Unit, dan register yang menjadi pusat pemrosesan instruksi.',
    objectives: ['Menjelaskan fungsi ALU, Control Unit, dan register.', 'Menghubungkan clock dengan pelaksanaan instruksi.'],
    sections: [
      ['CPU menjalankan instruksi', 'Central Processing Unit (CPU) adalah unit pemroses utama yang melaksanakan instruksi program. Inti atau core adalah unit pemrosesan yang dapat menjalankan aliran instruksi. Banyak CPU memiliki beberapa inti.'],
      ['ALU menghitung dan membandingkan', 'Arithmetic Logic Unit (ALU) menjalankan operasi aritmetika, seperti penjumlahan, serta operasi logika, seperti AND dan perbandingan. ALU menerima operand, yaitu nilai yang akan diolah, lalu menghasilkan hasil operasi.'],
      ['Control Unit mengoordinasikan', 'Control Unit (CU) menerjemahkan instruksi dan menghasilkan sinyal kontrol. Sinyal ini menentukan kapan register dibaca, operasi ALU apa yang dijalankan, dan ke mana hasil dipindahkan.'],
      ['Register dan clock', 'Register adalah penyimpanan kecil di dalam CPU untuk operand, alamat, dan hasil sementara. Program Counter (PC) menyimpan alamat instruksi berikutnya dalam model sederhana. Clock memberikan irama waktu bagi rangkaian sinkron; satu instruksi tidak harus selesai dalam satu detak clock.']
    ],
    example: 'Untuk menghitung 5 + 3, operand tersedia di register, CU memilih operasi tambah, dan ALU menghasilkan 8. Hasil dapat ditulis ke register tujuan. Data baru ditulis ke memori bila instruksi dan alur program memerlukannya.',
    diagram: ['Control Unit: pilih operasi tambah', 'Register operand: 5 dan 3', 'ALU: hitung 5 + 3', 'Register tujuan: 8'],
    extra: 'Frekuensi clock yang lebih tinggi tidak selalu berarti program lebih cepat. Jumlah instruksi, pekerjaan per siklus, cache, dan paralelisme juga berpengaruh.'
  },
  {
    id: 4, title: 'Siklus Instruksi', short: 'Siklus Instruksi', icon: 'flow', minutes: 12,
    summary: 'Ikuti proses fetch, decode, execute, dan store melalui satu instruksi sederhana.',
    objectives: ['Mengurutkan tahapan siklus instruksi.', 'Menelusuri perpindahan operand dan hasil.'],
    sections: [
      ['Fetch: mengambil instruksi', 'CPU mengambil instruksi dari sistem memori berdasarkan alamat instruksi yang dituju. Dalam model pembelajaran, instruksi dari RAM masuk ke Instruction Register (IR), yaitu register yang menampung instruksi aktif. CPU nyata biasanya memakai cache instruksi.'],
      ['Decode: memahami perintah', 'Control Unit menafsirkan opcode, yaitu bagian instruksi yang menyatakan operasi, beserta operandnya. Proses ini menentukan sumber data, operasi yang diperlukan, dan tujuan hasil.'],
      ['Execute: menjalankan operasi', 'Unit eksekusi mengerjakan operasi yang dipilih. ALU dapat menjumlahkan operand; instruksi lain dapat memuat data, membandingkan nilai, atau mengubah alur program melalui percabangan.'],
      ['Store: menuliskan hasil', 'Tahap penulisan hasil, atau write-back, memperbarui register tujuan bila instruksi menghasilkan nilai. Instruksi store yang sesungguhnya menulis ke memori. Empat tahap ini adalah penyederhanaan; pipeline dan tahapan prosesor nyata dapat berbeda.']
    ],
    example: 'Instruksi contoh ADD 5, 3 berarti jumlahkan 5 dan 3 pada laboratorium ini. Fetch mengambil teks instruksi, Decode mengenali ADD dan operand, Execute menghitung 8, lalu Store menyimpan 8 ke register hasil. Sintaks ini adalah bahasa simulasi, bukan ISA perangkat nyata.',
    diagram: ['Fetch: RAM → Instruction Register', 'Decode: CU mengenali operasi dan operand', 'Execute: ALU menjalankan perhitungan', 'Store: hasil → register tujuan'],
    extra: 'Pipelining menumpangtindihkan tahapan beberapa instruksi. Seperti lini kerja, instruksi berbeda dapat berada pada tahapan berbeda pada saat yang sama.', sim: 'instruction'
  },
  {
    id: 5, title: 'Hierarki Memori', short: 'Hierarki Memori', icon: 'layers', minutes: 14,
    summary: 'Bandingkan register, cache, RAM, dan SSD berdasarkan peran serta sifatnya.',
    objectives: ['Mengurutkan hierarki memori secara konseptual.', 'Membedakan kapasitas, latensi, dan volatilitas.'],
    sections: [
      ['Mengapa memori berlapis?', 'Tidak ada satu teknologi memori yang sekaligus paling cepat, paling besar, dan paling murah. Sistem mengombinasikan lapisan penyimpanan. Data yang dibutuhkan segera diusahakan berada dekat dengan unit pemroses.'],
      ['Register dan cache', 'Register menampung nilai yang dipakai langsung oleh instruksi. Cache menyimpan salinan blok data atau instruksi dari memori untuk mempercepat akses berulang. Cache hit berarti data ditemukan di cache; cache miss berarti pencarian harus dilanjutkan ke tingkat berikutnya.'],
      ['RAM dan penyimpanan sekunder', 'Random Access Memory (RAM) menampung program dan data yang sedang aktif. RAM utama umumnya bersifat volatile: data hilang ketika daya terputus. SSD bersifat non-volatile dan mempertahankan data tanpa daya; aksesnya melalui sistem penyimpanan lebih lambat daripada RAM dalam hierarki ini.'],
      ['Latensi berbeda dari kapasitas', 'Latensi adalah waktu tunggu hingga akses menghasilkan data. Kapasitas adalah banyaknya data yang dapat ditampung. Bandwidth adalah banyaknya data yang dapat dipindahkan per satuan waktu. Menambah kapasitas tidak otomatis mengurangi latensi.']
    ],
    example: 'Saat membuka aplikasi, berkas program dibaca dari SSD ke RAM. Ketika CPU menjalankannya, instruksi dan data yang sering digunakan dapat berada di cache, sedangkan operand aktif berada di register. Model ini menyederhanakan keterlibatan sistem operasi dan pengendali memori.',
    diagram: ['Register: paling dekat, kapasitas sangat kecil', 'Cache: salinan data yang sering dipakai', 'RAM: ruang kerja program aktif', 'SSD: penyimpanan jangka panjang'],
    extra: 'Locality menjelaskan mengapa cache berguna: temporal locality adalah kecenderungan memakai kembali data yang sama, sedangkan spatial locality adalah kecenderungan mengakses lokasi yang berdekatan.', sim: 'memory'
  },
  {
    id: 6, title: 'Sistem Bus', short: 'Sistem Bus', icon: 'flow', minutes: 10,
    summary: 'Pelajari jalur data, alamat, dan kontrol yang menghubungkan komponen.',
    objectives: ['Membedakan fungsi data, address, dan control bus.', 'Menjelaskan peran PCIe secara konseptual.'],
    sections: [
      ['Bus sebagai jalur komunikasi', 'Bus adalah mekanisme komunikasi yang membawa informasi antarkomponen. Dalam model klasik, jalur dibagi menjadi data, alamat, dan kontrol. Implementasi modern dapat memakai koneksi serial titik-ke-titik, tidak selalu satu jalur bersama.'],
      ['Data bus membawa isi', 'Data bus membawa nilai yang dibaca atau ditulis. Saat CPU membaca memori, isi data bergerak menuju pemroses; saat menulis, isi data bergerak ke memori. Lebar jalur dan laju transfer memengaruhi kapasitas perpindahan data.'],
      ['Address dan control bus', 'Address bus menyatakan lokasi yang dituju, misalnya alamat memori. Control bus membawa sinyal pengatur seperti baca, tulis, dan status. Alamat menjawab di mana, data menjawab apa isinya, dan kontrol menjawab operasi apa yang diminta.'],
      ['Motherboard dan PCIe', 'Motherboard menyediakan soket, slot, rangkaian, dan jalur koneksi. PCI Express (PCIe) adalah interkoneksi serial berbasis lane yang umum menghubungkan GPU dan SSD NVMe. PCIe mengangkut paket informasi melalui koneksi dua arah.']
    ],
    example: 'Untuk membaca nilai pada alamat 100, CPU menyampaikan alamat tujuan dan permintaan baca. Sistem memori mengembalikan isi di lokasi tersebut. Angka 100 adalah contoh alamat abstrak, bukan lokasi tertentu di perangkatmu.',
    diagram: ['Alamat: tentukan lokasi tujuan', 'Kontrol: ajukan operasi baca', 'Data: kirim isi lokasi', 'Status: transaksi selesai'],
    extra: 'NVMe adalah protokol untuk mengakses penyimpanan non-volatile, PCIe adalah interkoneksi, dan M.2 adalah format modul/konektor. Ketiganya bukan istilah yang saling menggantikan.', sim: 'data'
  },
  {
    id: 7, title: 'Sistem Input dan Output', short: 'Sistem Input dan Output', icon: 'monitor', minutes: 10,
    summary: 'Telusuri komunikasi keyboard, layar, dan perangkat lain dengan sistem komputer.',
    objectives: ['Mengidentifikasi perangkat input dan output.', 'Membedakan polling, interupsi, dan DMA.'],
    sections: [
      ['Input dan output', 'Input memasukkan data ke komputer, misalnya keyboard, mouse, dan mikrofon. Output menyampaikan hasil, misalnya layar, speaker, dan printer. Sebuah perangkat, seperti layar sentuh atau antarmuka jaringan, dapat menangani keduanya.'],
      ['Pengendali dan driver', 'Pengendali perangkat adalah perangkat keras yang menangani komunikasi dengan perangkat. Driver adalah perangkat lunak yang memungkinkan sistem operasi mengoperasikan pengendali tersebut. CPU tidak harus mengetahui seluruh detail fisik setiap perangkat.'],
      ['Polling dan interupsi', 'Pada polling, CPU memeriksa status perangkat secara berkala. Pada interupsi, perangkat atau pengendalinya memberi sinyal ketika membutuhkan perhatian. CPU kemudian menjalankan penangan yang sesuai, dengan dukungan sistem operasi.'],
      ['DMA memindahkan blok data', 'Direct Memory Access (DMA) memungkinkan pengendali memindahkan blok data ke atau dari memori tanpa CPU menyalin setiap byte. CPU masih menyiapkan operasi dan menangani penyelesaiannya. Ini membantu efisiensi transfer besar.']
    ],
    example: 'Ketika mengetik, pengendali keyboard melaporkan kejadian tombol. Sistem operasi menanganinya dan aplikasi memperbarui dokumen. Layar kemudian menampilkan hasil. Diagram ini menyederhanakan buffering dan protokol perangkat.',
    diagram: ['Perangkat input: tombol ditekan', 'Pengendali dan driver: tangani kejadian', 'CPU dan RAM: aplikasi memperbarui data', 'Perangkat output: layar diperbarui'],
    extra: 'Interupsi bukan selalu kesalahan. Interupsi perangkat sering kali hanya memberi tahu bahwa input tersedia atau suatu pekerjaan sudah selesai.', sim: 'data'
  },
  {
    id: 8, title: 'Penyimpanan Data', short: 'Penyimpanan Data', icon: 'layers', minutes: 12,
    summary: 'Pahami SSD, NVMe, dan perjalanan data dari ruang kerja menuju penyimpanan.',
    objectives: ['Membedakan penyimpanan dan memori kerja.', 'Menjelaskan hubungan SSD, NVMe, dan sistem berkas.'],
    sections: [
      ['Penyimpanan menjaga data', 'Penyimpanan sekunder mempertahankan data saat komputer dimatikan. HDD menyimpan data secara magnetik pada piringan, sedangkan SSD memakai memori flash dan tidak memiliki bagian mekanis bergerak untuk akses datanya.'],
      ['SSD, NVMe, dan M.2', 'Solid State Drive (SSD) adalah perangkat penyimpanan. NVMe adalah protokol yang dirancang untuk akses penyimpanan non-volatile, umum melalui PCIe. M.2 menjelaskan bentuk dan konektor modul; tidak semua perangkat M.2 otomatis menggunakan NVMe.'],
      ['Sistem berkas mengatur informasi', 'Sistem berkas mengatur nama, direktori, metadata, dan lokasi data. Aplikasi meminta operasi baca atau tulis melalui sistem operasi. Pengendali penyimpanan menangani komunikasi ke media penyimpanan.'],
      ['Menyimpan bukan sekadar memindahkan', 'Saat pengguna menyimpan berkas, data dapat melewati buffer dan cache sebelum mencapai media. Penyelesaian di aplikasi tidak selalu identik dengan semua data sudah ditulis secara fisik. Mekanisme flush dan sinkronisasi membantu memastikan ketahanan data sesuai kebutuhan.']
    ],
    example: 'Dokumen yang sedang diedit berada di RAM. Saat disimpan, aplikasi meminta sistem operasi menulis berkas. Data dikirim melalui sistem penyimpanan ke SSD. Setelah tersimpan dengan benar, berkas dapat dibuka lagi pada sesi berikutnya.',
    diagram: ['Aplikasi: minta simpan dokumen', 'RAM: sediakan isi berkas', 'Sistem berkas dan pengendali: atur penulisan', 'SSD: pertahankan data'],
    extra: 'Data non-volatile tetap memerlukan cadangan. Kerusakan perangkat, penghapusan, dan kesalahan aplikasi masih dapat menghilangkan data.', sim: 'data'
  },
  {
    id: 9, title: 'Pemrosesan Paralel dan GPU', short: 'Pemrosesan Paralel dan GPU', icon: 'chip', minutes: 12,
    summary: 'Kenali kerja paralel GPU dan kolaborasinya dengan CPU saat mengolah gambar.',
    objectives: ['Menjelaskan paralelisme pada tingkat dasar.', 'Membedakan peran CPU, GPU, dan memori grafis.'],
    sections: [
      ['Pekerjaan dapat dibagi', 'Pemrosesan paralel mengerjakan beberapa bagian pekerjaan secara bersamaan. Agar bermanfaat, bagian pekerjaan harus dapat dijalankan dengan ketergantungan yang terkendali. Koordinasi dan pemindahan data juga membutuhkan waktu.'],
      ['CPU dan GPU saling melengkapi', 'CPU cocok mengatur alur program umum dan pekerjaan dengan banyak percabangan. Graphics Processing Unit (GPU) memiliki banyak unit komputasi untuk menjalankan pekerjaan sejenis pada banyak data, seperti pemrosesan piksel atau operasi matriks.'],
      ['Memori dan koneksi grafis', 'GPU diskret biasanya memakai memori grafis sendiri, sering disebut VRAM, dan berkomunikasi dengan sistem melalui PCIe. GPU terintegrasi umumnya berbagi memori sistem. Karakteristik ini memengaruhi cara data tersedia untuk pemrosesan.'],
      ['Dari data menjadi tampilan', 'Aplikasi dan CPU menyiapkan perintah grafis. GPU memproses geometri, warna, dan piksel, lalu sistem tampilan mengirim frame ke monitor. Tidak semua aplikasi memperoleh percepatan yang sama dari GPU.']
    ],
    example: 'Mengubah kecerahan jutaan piksel dapat dibagi ke banyak unit GPU karena operasi tiap piksel serupa. Sebaliknya, alur yang setiap langkahnya menunggu hasil langkah sebelumnya sulit diparalelkan secara penuh.',
    diagram: ['CPU: siapkan perintah dan data', 'GPU: proses banyak elemen secara paralel', 'Framebuffer: simpan hasil gambar', 'Monitor: tampilkan frame'],
    extra: 'Menambah unit pemroses tidak selalu menghasilkan percepatan linear. Bagian program yang harus berjalan serial dan biaya komunikasi membatasi manfaatnya.', sim: 'data'
  },
  {
    id: 10, title: 'Evaluasi Akhir', short: 'Evaluasi Akhir', icon: 'check', minutes: 16,
    summary: 'Hubungkan seluruh konsep dan uji pemahamanmu tentang satu sistem komputer.',
    objectives: ['Menelusuri alur kerja komputer secara utuh.', 'Menjelaskan ketergantungan daya, pendinginan, dan pemrosesan.'],
    sections: [
      ['Satukan model mentalmu', 'Mulai dari kebutuhan aplikasi: input apa yang diterima, instruksi apa yang dijalankan, data apa yang dibutuhkan, dan output apa yang dihasilkan. Hubungkan tindakan tersebut dengan CPU, hierarki memori, I/O, dan penyimpanan.'],
      ['Daya mendukung seluruh sistem', 'Power Supply Unit (PSU) mengubah daya listrik masukan menjadi tegangan DC yang diperlukan komponen. Konektor dan rangkaian pengatur daya pada motherboard serta kartu ekspansi mendistribusikan dan menyesuaikan daya. PSU tidak menjalankan instruksi program.'],
      ['Panas harus dipindahkan', 'Heatsink menyebarkan panas dari komponen, sementara kipas dan aliran udara membantu memindahkannya ke lingkungan. Suhu tinggi dapat menyebabkan prosesor mengurangi kinerja untuk menjaga batas operasionalnya. Casing membantu penempatan komponen dan pengaturan airflow.'],
      ['Evaluasi dengan alasan', 'Ketika aplikasi terasa lambat, jangan langsung menyimpulkan CPU bermasalah. Waktu akses penyimpanan, tekanan memori, beban GPU, pola program, dan kondisi termal dapat berpengaruh. Identifikasi jalur kerja dan bukti sebelum menarik kesimpulan.']
    ],
    example: 'Saat membuka editor gambar: SSD menyediakan aplikasi dan berkas, RAM menampung data aktif, CPU mengatur program, dan GPU dapat membantu pengolahan serta tampilan. Semua memerlukan daya stabil; pendingin membuang panas selama pemrosesan.',
    diagram: ['Input: pengguna membuka gambar', 'SSD → RAM: muat program dan data', 'CPU ↔ GPU: jalankan instruksi dan pengolahan grafis', 'Output: layar menampilkan hasil; PSU dan pendingin mendukung sistem'],
    extra: 'Kuis akhir mengambil pertanyaan dari seluruh modul. Baca pembahasan dan gunakan rekomendasi untuk mengulang bagian yang belum dipahami.'
  }
];

/** Questions: prompt, four options, correct option index, explanation. */
export const questions = {
  1: [
    ['Manakah yang termasuk arsitektur komputer?', ['Bentuk heatsink', 'Kumpulan instruksi yang dapat dijalankan CPU', 'Posisi kipas casing', 'Warna motherboard'], 1, 'Kumpulan instruksi adalah bagian ISA yang terlihat oleh programmer. Detail penempatan dan implementasi perangkat keras termasuk organisasi atau desain fisik.'],
    ['Saat mengetik dokumen, komponen mana yang terutama menampung data aktif aplikasi?', ['PSU', 'Panel kaca', 'RAM', 'Kabel daya'], 2, 'RAM menampung program dan data yang sedang digunakan. SSD mempertahankan berkas yang sudah disimpan.']
  ],
  2: [
    ['Berapakah nilai desimal dari 1010₂?', ['8', '12', '2', '10'], 3, 'Bobot digit aktif adalah 8 dan 2. Jadi 1010₂ = 8 + 2 = 10₁₀.'],
    ['Pernyataan mana yang benar?', ['Satu byte terdiri dari 8 bit', 'Semua karakter UTF-8 selalu 1 byte', 'Satu bit memiliki 10 nilai', 'Heksadesimal berbasis dua'], 0, 'Satu byte terdiri dari 8 bit. UTF-8 memakai jumlah byte yang bervariasi untuk karakter yang berbeda.']
  ],
  3: [
    ['Unit mana yang menjalankan operasi penjumlahan dan logika?', ['PSU', 'SSD', 'ALU', 'Heatsink'], 2, 'Arithmetic Logic Unit (ALU) menjalankan operasi aritmetika dan logika. Control Unit mengatur operasi yang dilakukan.'],
    ['Apa fungsi Control Unit?', ['Menyimpan berkas tanpa daya', 'Membuang panas CPU', 'Menghasilkan output suara', 'Menerjemahkan instruksi dan mengatur sinyal kontrol'], 3, 'Control Unit mengoordinasikan eksekusi instruksi dengan mengatur sinyal kontrol dan perpindahan data.']
  ],
  4: [
    ['Urutan siklus instruksi dalam model pembelajaran ini adalah…', ['Decode → Fetch → Store → Execute', 'Fetch → Decode → Execute → Store', 'Store → Execute → Fetch → Decode', 'Execute → Store → Decode → Fetch'], 1, 'Instruksi diambil, diterjemahkan, dijalankan, lalu hasilnya ditulis bila diperlukan. Prosesor nyata dapat memiliki tahapan berbeda.'],
    ['Di mana hasil ADD 5, 3 disimpan pada simulasi ini?', ['Langsung ke SSD', 'Di kipas CPU', 'Di register hasil', 'Di keyboard'], 2, 'Tahap Store pada model ini adalah penulisan hasil ke register tujuan. Menulis hasil ke RAM membutuhkan operasi penyimpanan sesuai instruksi.']
  ],
  5: [
    ['Lapisan mana yang mempertahankan data tanpa daya?', ['Register', 'Cache', 'RAM utama', 'SSD'], 3, 'SSD memakai media non-volatile. Register, cache, dan RAM utama dalam model ini memerlukan daya untuk mempertahankan data.'],
    ['Apa arti cache hit?', ['Data ditemukan di cache', 'Cache kehilangan daya', 'RAM selalu penuh', 'CPU menulis langsung ke SSD'], 0, 'Cache hit berarti data yang diminta tersedia di cache sehingga tidak perlu diambil dari tingkat memori berikutnya.']
  ],
  6: [
    ['Jalur yang menyatakan lokasi tujuan akses adalah…', ['Data bus', 'Control bus', 'Address bus', 'Kabel kipas'], 2, 'Address bus menyatakan alamat tujuan. Data bus membawa isi, dan control bus mengatur jenis operasi.'],
    ['Pernyataan yang tepat tentang PCIe, NVMe, dan M.2 adalah…', ['Ketiganya nama lain dari RAM', 'PCIe adalah interkoneksi, NVMe protokol, M.2 format modul/konektor', 'NVMe adalah kipas pendingin', 'Semua modul M.2 pasti menggunakan NVMe'], 1, 'Ketiganya menjelaskan aspek berbeda: jalur komunikasi, protokol penyimpanan, dan format fisik modul/konektor.']
  ],
  7: [
    ['Apa manfaat DMA?', ['Mengganti fungsi semua register', 'Menyimpan data tanpa media', 'Mempercepat kipas', 'Memindahkan blok data tanpa CPU menyalin setiap byte'], 3, 'DMA memungkinkan pengendali memindahkan data ke atau dari memori. CPU tetap menyiapkan operasi dan menangani penyelesaiannya.'],
    ['Apa perbedaan polling dan interupsi?', ['Polling memeriksa status berkala; interupsi memberi sinyal saat perlu perhatian', 'Polling selalu tanpa CPU', 'Interupsi selalu berarti kerusakan', 'Keduanya hanya berlaku pada SSD'], 0, 'Polling aktif memeriksa status, sedangkan interupsi memberitahukan kejadian yang perlu ditangani. Interupsi tidak selalu merupakan kesalahan.']
  ],
  8: [
    ['Mengapa dokumen yang belum disimpan dapat hilang saat daya mati?', ['GPU tidak punya kipas', 'RAM bersifat volatile', 'SSD selalu menghapus data', 'Motherboard tidak memiliki slot'], 1, 'Perubahan yang baru ada di RAM tidak bertahan tanpa daya. Data harus disimpan dengan benar ke media non-volatile.'],
    ['Apa peran sistem berkas?', ['Menentukan warna piksel', 'Menambah clock CPU', 'Mengatur nama, direktori, metadata, dan lokasi data', 'Mendinginkan SSD'], 2, 'Sistem berkas mengatur organisasi data di penyimpanan sehingga aplikasi dapat mengakses berkas melalui sistem operasi.']
  ],
  9: [
    ['Pekerjaan mana yang cocok untuk paralelisme GPU?', ['Rangkaian langkah yang seluruhnya saling menunggu', 'Mengatur tegangan PSU', 'Mengganti tombol keyboard', 'Menerapkan operasi serupa pada banyak piksel'], 3, 'Banyak piksel dapat diolah secara paralel dengan operasi yang serupa. Ketergantungan serial dan biaya transfer membatasi percepatan.'],
    ['Manakah pernyataan yang benar tentang GPU?', ['GPU diskret umumnya memiliki memori grafis sendiri', 'GPU menggantikan PSU', 'Semua program selalu lebih cepat di GPU', 'GPU tidak berkomunikasi dengan CPU'], 0, 'GPU diskret umumnya menggunakan memori grafis sendiri. Manfaatnya bergantung pada pekerjaan dan biaya perpindahan data.']
  ],
  10: [
    ['Apa peran PSU dalam sistem komputer?', ['Menerjemahkan instruksi', 'Menyimpan data aktif', 'Menyediakan daya listrik yang sesuai untuk komponen', 'Mengonversi bilangan biner'], 2, 'PSU menyediakan tegangan DC untuk komponen. Rangkaian di motherboard dan kartu dapat mengatur tegangan lebih lanjut.'],
    ['Mengapa pendinginan yang memadai diperlukan?', ['Agar semua data menjadi non-volatile', 'Untuk memindahkan panas dan mendukung kestabilan sistem', 'Agar SSD menggantikan CPU', 'Untuk mengubah jumlah bit satu byte'], 1, 'Pendinginan memindahkan panas ke lingkungan. Suhu yang terlalu tinggi dapat memicu pembatasan kinerja untuk menjaga operasi perangkat.']
  ]
};

export const components = [
  { name: 'Panel kaca', frame: 38, module: 1, role: 'Melindungi bagian dalam sambil memungkinkan komponen terlihat.', connection: 'Terpasang pada sasis; bentuknya memengaruhi akses dan penutupan casing.', example: 'Melepas panel memberikan akses fisik ke motherboard dan kartu ekspansi.' },
  { name: 'Cooler / heatsink', frame: 69, module: 10, role: 'Memindahkan panas dari CPU melalui permukaan kontak, heatsink, dan udara atau cairan.', connection: 'Menempel pada CPU dan bekerja bersama aliran udara casing.', example: 'Saat CPU bekerja berat, pendingin membuang panas agar suhu tetap dalam batas operasi.' },
  { name: 'RAM', frame: 88, module: 5, role: 'Menampung program dan data yang sedang digunakan; bersifat volatile.', connection: 'Terhubung ke pengendali memori melalui slot dan jalur pada motherboard.', example: 'Dokumen yang sedang diedit berada di memori kerja sebelum disimpan ke SSD.' },
  { name: 'GPU', frame: 103, module: 9, role: 'Mengerjakan pemrosesan grafis dan operasi paralel pada banyak data.', connection: 'GPU diskret berkomunikasi melalui PCIe, memakai daya, dan mengirim tampilan ke monitor.', example: 'Mengolah geometri dan piksel untuk menampilkan adegan tiga dimensi.' },
  { name: 'Motherboard', frame: 109, module: 6, role: 'Menyediakan soket, slot, rangkaian, serta jalur komunikasi dan daya.', connection: 'Menghubungkan CPU, RAM, penyimpanan, kartu ekspansi, dan perangkat I/O.', example: 'Jalur PCIe menghubungkan CPU atau chipset dengan GPU dan SSD NVMe.' },
  { name: 'CPU', frame: 109, module: 3, role: 'Menjalankan instruksi melalui unit kontrol, ALU, dan register.', connection: 'Mengambil instruksi dan data melalui sistem memori serta mengoordinasikan pekerjaan perangkat.', example: 'Menjumlahkan operand 5 dan 3, lalu menulis 8 ke register tujuan.' },
  { name: 'SSD NVMe', frame: 115, module: 8, role: 'Menyimpan program dan berkas pada media non-volatile dengan protokol NVMe.', connection: 'Modul NVMe berkomunikasi dengan sistem melalui PCIe.', example: 'Menyediakan berkas aplikasi saat aplikasi dimuat ke RAM.' },
  { name: 'PSU', frame: 117, module: 10, role: 'Mengubah daya masukan menjadi tegangan DC untuk perangkat keras.', connection: 'Memasok motherboard, GPU, dan perangkat lain melalui konektor yang sesuai.', example: 'Menyediakan daya saat CPU dan GPU menjalankan pemrosesan.' },
  { name: 'Kabel konektor', frame: 119, module: 10, role: 'Mengantarkan daya atau sinyal sesuai jenis kabel dan konektornya.', connection: 'Kabel daya berselubung pada ilustrasi menghubungkan PSU dengan komponen.', example: 'Kabel daya utama memasok motherboard; jalur data tetap menggunakan koneksi tersendiri.' },
  { name: 'Rangka sasis', frame: 119, module: 10, role: 'Menopang pemasangan komponen dan membantu mengatur aliran udara.', connection: 'Menjadi tempat motherboard, PSU, panel, dan kipas dipasang.', example: 'Penempatan kipas masuk dan keluar membantu memindahkan udara panas.' },
  { name: 'Panel belakang', frame: 119, module: 10, role: 'Menutup sisi belakang casing dan melindungi area manajemen kabel.', connection: 'Terpasang pada sasis, di belakang dudukan motherboard.', example: 'Menutup area perutean kabel setelah komponen terpasang.' }
];

export const stories = [
  { at: 0, label: 'SISTEM KOMPUTER', short: 'Pengenalan sistem', title: 'Satu Sistem, Banyak Komponen', copy: 'Komputer menerima input, memproses data, menghasilkan output, dan menyimpan informasi. Setiap komponen menjalankan bagian dari pekerjaan ini.', example: 'Mengetik dokumen melibatkan keyboard, CPU, RAM, layar, dan penyimpanan.', module: 1 },
  { at: .15, label: 'ARSITEKTUR & ORGANISASI', short: 'Arsitektur dan organisasi', title: 'Arsitektur Menentukan Apa, Organisasi Menjelaskan Bagaimana', copy: 'Arsitektur adalah kontrak yang terlihat oleh programmer. Organisasi adalah cara perangkat keras diatur untuk mewujudkan kontrak tersebut.', example: 'Dua CPU dapat memakai ISA yang sama dengan susunan cache dan unit eksekusi yang berbeda.', module: 1 },
  { at: .30, label: 'CPU & INSTRUKSI', short: 'CPU dan instruksi', title: 'CPU Menjalankan Setiap Instruksi', copy: 'Control Unit mengatur operasi, ALU menghitung, dan register menampung data sementara. Instruksi diambil, diterjemahkan, dijalankan, lalu hasilnya ditulis.', example: 'ADD 5, 3 menghasilkan 8 di register tujuan pada simulasi pembelajaran.', module: 4 },
  { at: .50, label: 'MEMORI & PENYIMPANAN', short: 'Hierarki memori', title: 'Data Bergerak Melalui Hierarki Memori', copy: 'Register dan cache dekat dengan pemroses. RAM menampung pekerjaan aktif, sedangkan SSD mempertahankan berkas saat daya mati.', example: 'Aplikasi dimuat dari SSD ke RAM; data yang sering dipakai dapat tersedia di cache.', module: 5 },
  { at: .70, label: 'GPU, BUS & I/O', short: 'Komunikasi komponen', title: 'Komponen Berkomunikasi Melalui Jalur Data', copy: 'Jalur komunikasi membawa data, alamat, dan kontrol. GPU mengolah grafis, sementara sistem I/O menjembatani perangkat dan pemroses.', example: 'CPU menyiapkan perintah grafis, GPU mengolahnya, lalu layar menampilkan frame.', module: 6 },
  { at: .85, label: 'INTEGRASI SISTEM', short: 'Daya dan pendinginan', title: 'Setiap Komponen Bekerja sebagai Satu Kesatuan', copy: 'PSU memasok daya, kabel menghubungkan, dan pendingin membuang panas. Rangka menata komponen agar sistem dapat beroperasi stabil.', example: 'Pemrosesan berat memerlukan daya yang sesuai dan pembuangan panas yang memadai.', module: 10 }
];
