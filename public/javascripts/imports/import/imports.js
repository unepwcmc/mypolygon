function delete_imports(import_id) {
	var confirm = window.confirm("Are you sure you want to delete this import?  Once the import is deleted, you can no longer access data associated with the import.")
	if (confirm) {
		$.ajax({
			url: "/imports/" + import_id,
			type: "DELETE",
			success: "remove_import(" + import_id + ");"
		});
		
	}
	return false;
}

function remove_import(import_id) {
	var liElement = document.getElementById("import_item_" + import_id);
	liElement.innerHTML = 'No import';
	liElement.setAttribute("class", "no_import_item");
}

function delete_download(download_id) {
	var confirm = window.confirm("Are you sure you want to delete this download?  Once the download is deleted, you may no longer access the data or upload an associated import.")
	if (confirm) {
		$.ajax({
			url: "/downloads/" + download_id,
			type: "DELETE",
			success: "remove_download(" + download_id + ");"
		});
		
	}
	return false;
}

function remove_download(download_id) {
	var liElement = document.getElementById("download_item_" + download_id);
	var listElement = document.getElementById("downloads_list");
	listElement.removeChilde(liElement);
}



