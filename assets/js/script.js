document.addEventListener("DOMContentLoaded", function(){
	const submitForm = document.getElementById('input_buku');
	const checkSubmit = document.getElementById('input_selesai_dibaca');
	const textSubmit = document.querySelector('button#submit_buku > span');

	//search 
	const submitSearch = document.getElementById('cari_buku');
	const cari_judul_buku = document.forms['cari_buku'].querySelector('.input input');

	cari_judul_buku.addEventListener('keyup', function(e){
		const term = e.target.value.toLowerCase();
		const kumpulanListBuku = document.querySelectorAll('.list_buku');
		const listBelumSelesai = kumpulanListBuku[0].getElementsByClassName('item_buku');
		const listSelesai = kumpulanListBuku[1].getElementsByClassName('item_buku');

		submitSearch.addEventListener('submit', function(){
			Array.from(listBelumSelesai).forEach(function(book){
				const title = book.firstElementChild.textContent;
				if (title.toLowerCase().indexOf(term) != -1) {
					book.style.display = 'block';
				}else{
					book.style.display = 'none';
				}
			})
			Array.from(listSelesai).forEach(function(book){
				const title = book.firstElementChild.textContent;
				if (title.toLowerCase().indexOf(term) != -1) {
					book.style.display = 'block';
				}else{
					book.style.display = 'none';
				}
			})
			event.preventDefault();
		});
	});

	checkSubmit.addEventListener('click', function(){
		if(checkSubmit.checked){
			textSubmit.innerText = "Selesai Dibaca";
		}else{
			textSubmit.innerText = "Belum Selesai Dibaca";
		}
	});

	submitForm.addEventListener('submit', function(){
		// event.preventDefault();
		if(checkSubmit.checked){
			tambahBukuSelesai();
		}else{
			tambahBuku();
		}
		
	});
	if(apakahStorageTersedia()){
		memuatDataDariStorage();
	}
});

document.addEventListener('ketikaDataDisimpan', () =>{
	console.log("Data Berhasil Disimpan dan Diupdate");
})

document.addEventListener('ketikaDataDiMuat', () =>{
	refreshDataDariBooks();
});

