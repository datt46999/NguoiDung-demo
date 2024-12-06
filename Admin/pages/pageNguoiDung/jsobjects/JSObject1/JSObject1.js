export default {
	// Hàm mã hóa mật khẩu
	generatePasswordHash: async () => {
		// Mã hóa mật khẩu
		var password_hash = dcodeIO.bcrypt.hashSync(input_pass.text, 10);
		console.log(password_hash); // Kiểm tra mật khẩu đã mã hóa
		return password_hash; // Trả về mật khẩu đã mã hóa
	},
	generatePasswordHash_1: async () => {
		// Mã hóa mật khẩu
		var password_hash = dcodeIO.bcrypt.hashSync(txt_newpass2.text, 10);
		console.log(password_hash); // Kiểm tra mật khẩu đã mã hóa
		return password_hash; // Trả về mật khẩu đã mã hóa
	},

	actionCreateAdmin: async () => {
		// Assuming `getAdmins` is a query to fetch existing admins
		const password = await this.generatePasswordHash();
		console.log(password);
		const uuid = UUID.genV4();
		// console.log(uuid);
		const obj = {
			id:uuid.hexNoDelim,
			// so_dien_thoai: input_sdt,
			password: password,
		};
		await insetUser.run(obj);
		await getUsers.run();
		showAlert("Người dùng đã được tạo thành công!", "success");
		closeModal(modal_adduser.name);

	},




}