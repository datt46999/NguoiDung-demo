export default {
	generatePasswordHash: async () => {
		var password_hash = dcodeIO.bcrypt.hashSync(password.text, 10);
		console.log(password_hash);
		return password_hash;
	},

	createToken: async (user) => {
		var token = jsonwebtoken.sign(user, 'secret');
		await storeValue("tokenAdmin", token);
		// await storeValue("id_admin", 11111);
		return token;
	},

	comparePassword: async (password, hash) => {
		return dcodeIO.bcrypt.compareSync(password, hash)
	},

	actionLogin: async () => {
		try{
			const [user] = await FindUser.run();
			var check = await this.comparePassword(password.text, user.password);
			storeValue("id_admin", user.id);

			if(check) {
				user.token = await this.createToken(user)
					.then( async () => await UpdateToken.run(user));

				showAlert("Đăng nhập thành công", "success");
				navigateTo('MASTER_ADMIN');
			} else {
				showAlert("Email hoặc mật khẩu không đúng", "error");
			}
		}catch(error){
			showAlert("Email hoặc mật khẩu không đúng", "error");
		}


	},

	checkLogin: async () => {
		const token = appsmith.store.tokenAdmin;
		// try {
		// 
		// } catch (err) {
		// return false;  // return false in case of error (invalid token or other issues)
		// }
		const decoded = await new Promise((resolve, reject) => {
			jsonwebtoken.verify(token, 'secret', (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});
		console.log(decoded);
		const [check_acp] = await FindAdminBuyToken.run(decoded);
		if (check_acp) {
			return true;
		} else {
			return false;
		}
	}
}