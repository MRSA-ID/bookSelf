const UNCOMPLETED_LIST_BOOK = "belum_selesai_dibaca";
const COMPLETED_LIST_BOOK = "selesai_dibaca";
const BOOKS_BUKUID = 'itemId';

function makeBook(judul, penulis, tahun, apakahSelesai){
	const inputJudul = document.createElement('h2');
	inputJudul.innerText = judul;

	const inputPenulis = document.createElement('p');
	inputPenulis.innerText = "Penulis : "+penulis;

	const inputTahun = document.createElement('p');
	inputTahun.innerText = "Tahun : "+tahun;


	const containerButton = document.createElement('div');
	containerButton.classList.add('action');
	
	const article = document.createElement('article');
	article.classList.add('item_buku');
	article.append(inputJudul, inputPenulis, inputTahun, containerButton);

	if(apakahSelesai){
		containerButton.append(
			undoButton(),
			buttonHapus()
		);
	}else{
	containerButton.append(
			buttonSelesai(),
			buttonHapus()
		);
	}

	return article;
}

function tambahBuku(){
	const listBelumSelesai = document.getElementById(UNCOMPLETED_LIST_BOOK);

	const taskJudul = document.getElementById("input_judul").value;
	const taskPenulis = document.getElementById("input_penulis").value;
	const taskTahun = document.getElementById("input_tahun").value;

	const book = makeBook(taskJudul,taskPenulis,taskTahun,false);
	const untukObject = melakukanPenulisanKeObject(taskJudul,taskPenulis,taskTahun,false);

	book[BOOKS_BUKUID] = untukObject.id;
	books.push(untukObject);

	listBelumSelesai.append(book);
	perbaruiDataKeStorage();
}

function tambahBukuSelesai(){
	const listSelesai = document.getElementById(COMPLETED_LIST_BOOK);
	const taskJudul = document.getElementById("input_judul").value;
	const taskPenulis = document.getElementById("input_penulis").value;
	const taskTahun = document.getElementById("input_tahun").value;

	const newBook = makeBook(taskJudul,taskPenulis,taskTahun,true);
	const untukObject = melakukanPenulisanKeObject(taskJudul, taskPenulis, taskTahun, true);
	newBook[BOOKS_BUKUID] = untukObject.id;
	books.push(untukObject);

	listSelesai.append(newBook);
	perbaruiDataKeStorage();
}

function tambahkanKeSelesai(taskElement){
	const listSelesai = document.getElementById(COMPLETED_LIST_BOOK);
	const text_title = taskElement.querySelector(".item_buku > h2").innerText;
	const p = taskElement.querySelectorAll(".item_buku > p");
	const text_penulis = p[0].innerText.substr(9);
	const text_tahun = p[1].innerText.substr(7);

	const newBooks = makeBook(text_title, text_penulis, text_tahun, true);
	const booksObject = mencariBuku(taskElement[BOOKS_BUKUID]);
	booksObject.apakahSelesai = true;
	newBooks[BOOKS_BUKUID] = booksObject.id;

	listSelesai.append(newBooks);
	taskElement.remove();
	perbaruiDataKeStorage();
}

function undoListSelesai(taskElement){
	const listBelumSelesai = document.getElementById(UNCOMPLETED_LIST_BOOK);
	const text_title = taskElement.querySelector(".item_buku > h2").innerText;
	const p = taskElement.querySelectorAll(".item_buku > p");
	const text_penulis = p[0].innerText.substr(9);
	const text_tahun = p[1].innerText.substr(7);

	const newBooks = makeBook(text_title, text_penulis, text_tahun, false);
	const booksObject = mencariBuku(taskElement[BOOKS_BUKUID]);
	booksObject.apakahSelesai = false;
	newBooks[BOOKS_BUKUID] = booksObject.id;
	
	listBelumSelesai.append(newBooks);
	taskElement.remove();
	perbaruiDataKeStorage();
}

function makeButton(buttonTypeClass, text, eventListener){
	const button = document.createElement('button');
	button.classList.add(buttonTypeClass);
	button.innerText = text;
	button.addEventListener("click", function(event){
		eventListener(event);
	})
	return button;
}

function undoButton() {
	return makeButton("green", "Belum Selesai Dibaca", function(event){
		undoListSelesai(event.target.parentElement.parentElement);
	});
}

function buttonSelesai(){
	return makeButton("green", "Selesai Dibaca", function(event){
		tambahkanKeSelesai(event.target.parentElement.parentElement);
	});
}

function buttonHapus(){
	return makeButton("red", "Hapus Buku", function(event){
		hapusBuku(event.target.parentElement.parentElement);
	});
}

function hapusBuku(taskElement){
	const posisiBuku = mencariBukuIndex(taskElement[BOOKS_BUKUID]);
	books.splice(posisiBuku, 1);
	taskElement.remove();
	perbaruiDataKeStorage();
}

function refreshDataDariBooks(){
	const listSelesai = document.getElementById(COMPLETED_LIST_BOOK);
	const listBelumSelesai = document.getElementById(UNCOMPLETED_LIST_BOOK);

	for(buku of books){
		const newBuku = makeBook(buku.judul, buku.penulis, buku.tahun, buku.apakahSelesai);
		newBuku[BOOKS_BUKUID] = buku.id;

		if(buku.apakahSelesai){
			listSelesai.append(newBuku);
		}else{
			listBelumSelesai.append(newBuku);
		}
	}
}
