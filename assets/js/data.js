const STORAGE_KEY = "Book_Self";

let books = [];

function apakahStorageTersedia(){
	if(typeof(Storage) === undefined){
		alert("Browser anda tidak mendukung local storage");
		return false;
	}
	return true;
}

function simpanData(){
	const parsed = JSON.stringify(books);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event("ketikaDataDisimpan"));
}

function memuatDataDariStorage(){
	const dataBerseri = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(dataBerseri);
	if(data !== null){
		books = data;
	}
	document.dispatchEvent(new Event("ketikaDataDiMuat"));
}

function perbaruiDataKeStorage(){
	if(apakahStorageTersedia()){
		simpanData();
	}
}

function melakukanPenulisanKeObject(judul, penulis, tahun, apakahSelesai){
	return{
		id: +new Date(),
		judul,
		penulis,
		tahun,
		apakahSelesai
	};
}

function mencariBuku(bukuId){
	for(buku of books){
		if(buku.id === bukuId){
			return buku;
		}
	}
	return null;
}

function mencariBukuIndex(bukuId){
	let index = 0;
	for(buku of books){
		if(buku.id === bukuId){
			return index;
		}
		index++;
	}
	return -1;
}