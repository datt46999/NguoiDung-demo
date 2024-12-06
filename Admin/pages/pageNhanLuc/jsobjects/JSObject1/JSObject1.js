export default {
	// Hàm mã hóa mật khẩu
	generatePasswordHash: async () => {
		// Mã hóa mật khẩu
		var password_hash = dcodeIO.bcrypt.hashSync(input_pass.text, 10);
		console.log(password_hash); // Kiểm tra mật khẩu đã mã hóa
		return password_hash; // Trả về mật khẩu đã mã hóa
	},

	actionCreateAdmin: async () => {
		// Assuming `getAdmins` is a query to fetch existing admins
		const password = await this.generatePasswordHash();
		console.log(password);
		const uuid = UUID.genV4();
		console.log(uuid);
		const obj = {
			id:uuid.hexNoDelim,
			password: password, 
		};
		await insertNhanLuc.run(obj);
		showAlert("Nhân lực đã được tạo thành công!", "success");
		await getNhanLucs.run();
		closeModal(modal_adduser.name);

	},


}