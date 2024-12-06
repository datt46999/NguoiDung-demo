export default {
	async getCurrentLoction () {
		var location = await appsmith.geolocation.getCurrentPosition()
		return {
		'lat' : location.coords.latitude,
			'lng' : location.coords.longitude,
		}
	},
	unNhanLucMap: async () => {
		try {
			// Lấy dữ liệu từ findNhanCuuTros.run()
			const NhanLuc = await findNhanCuuTros.run(); // Đảm bảo run() trả về Promise
			console.log("Dữ liệu nhân lực:", NhanLuc);


			NhanLuc.forEach((item) => {
				huyNhanLucs.run({"id":item.id_nhan_luc});	
			});

			// Trả về dữ liệu đã xử lý (nếu cần)
			return NhanLuc;
		} catch (error) {
			console.error("Lỗi khi xử lý nhân lực:", error);
		}
	},
	createNhanCuuTro:async ()=>{
		const uuid = UUID.genV4();
		await themMoi.run({id:uuid.hexNoDelim});
		await changeTrangThaiCuuNans.run();
		await changeNhanLucs.run();
		await getYeuCauCuuTro.run();
		await getNhanLucByNguonLuc.run();
		showAlert("Điều phối thành công!", "success");
		closeModal(Modal1.name);
	}
};
