
	var quickAddBtn          = document.getElementById("add");
	var AddBtn               = document.getElementById("submit");
	var cancelBtn            = document.getElementById("cancel");

	var  quickAddFormDiv     = document.querySelector(".addform");
	var  editFormDiv     	 = document.querySelector(".editform");

	var fullname = document.getElementById("fullname");
	var phone    = document.getElementById("phone");
	var address  = document.getElementById("address");
	var email    = document.getElementById("email");

	var addBookDiv = document.querySelector(".showme");

	var addressBook = [];

	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
		editFormDiv.style.display = "none";

	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);
	
	function jsonStructure(fullname, phone, address,email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.email = email;
	}
	// Add into the address book function
	function addToBook(){

		if (fullname.value!=="" && phone.value!=="" && address.value!=="" && email.value!=="") 
		{
			var newObj = new jsonStructure(fullname.value,  phone.value,  address.value, email.value) ;
			addressBook.push(newObj);
			localStorage['showme'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";


			showAddressBook();

			clearForm();
		} 
	}

	// Remove and Edit function
	function removeEntry(e){

		if(e.target.classList.contains("delbutton")){
			var affirm = confirm("Delete contact?");
			if(affirm){

			var remID =e.target.getAttribute("value");
			remID = remID - 1;

			addressBook.splice(remID, 1);
			localStorage['showme'] = JSON.stringify(addressBook);
			showAddressBook();
			}
		}else if(e.target.classList.contains("edtbutton")){
			var remID =e.target.getAttribute("value");
			remID = remID - 1;

			var edtID = e.target.getAttribute("data.id");
			editFormDiv.style.display = "block";
			quickAddFormDiv.style.display = "none";


			var AddEdt   	 = document.getElementById("edtsubmit");
			var cancelEdt    = document.getElementById("edtcancel");

			var edtname     = document.getElementById("edtname");
			var edtphone    = document.getElementById("edtphone");
			var edtaddress  = document.getElementById("edtaddress");
			var edtemail    = document.getElementById("edtemail");

			edtname.value  =  addressBook[remID].fullname;
			edtphone.value  =	addressBook[remID].phone;
			edtaddress.value= addressBook[remID].address;
			edtemail.value  = addressBook[remID].email;

			

			function jsonStructure(fullname, phone, address,email){
				this.fullname = fullname;
				this.phone = phone;
				this.address = address;
				this.email = email;
			}

			function addToBook(){

				edtname = edtname.value;
				fullname = edtname.trim();

				edtphone = edtphone.value;
				phone = edtphone.trim();

				edtaddress = edtaddress.value;
				address = edtaddress.trim();

				edtemail = edtemail.value;
				email = edtemail.trim();


				if (fullname=="" || phone=="" || address=="" || email =="") 
				{
					var error = document.getElementById("editErr");
						error.innerHTML = "*Some input spaces are empty*"
				}
				else{

					var edtObj = new jsonStructure(fullname,  phone, address, email);
					addressBook.splice(remID, 1, edtObj);
					// addressBook.push();


					localStorage['showme'] = JSON.stringify(addressBook);
					editFormDiv.style.display = "none";
					
					function clearEdtForm()
					{

							edtname = "";
						   edtphone = "";
						 edtaddress = "";
						   edtemail = "";						
					}

					showAddressBook();

				} 
			}

			cancelEdt.addEventListener("click", function(){

				editFormDiv.style.display = "none";

			});

			AddEdt.addEventListener("click", addToBook);
			
		}

	}

	

	function clearForm(){

		var fullname = document.getElementById("fullname");
		var phone    = document.getElementById("phone");
		var address  = document.getElementById("address");
		var email    = document.getElementById("email");

		fullname.value = "";
		   phone.value = "";
		 address.value = "";
		   email.value = "";
		
	}
	function showAddressBook(){

		if(localStorage['showme'] === undefined){

			localStorage['showme'] = "[]";
		}else
		{
			addressBook = JSON.parse(localStorage['showme']);
			addBookDiv.innerHTML = '<span class="header"><span class="head">ID</span><span class="head">Name</span><span class="head">Email</span><span class="head">Phone</span><span class="head">Address</span><span class="head">Actions</span></span>';
			for(var n in addressBook){
				var no = Number(n)+1;
				var str = '<div class="entry">';
					str += '<span class="spa name" id="no">' + no + '</span>';
					str += '<span class="spa name">' + addressBook[n].fullname + '</span>';
					str += '<span class="spa email">' + addressBook[n].email + '</span>';
					str += '<span class="spa phone">' + addressBook[n].phone + '</span>';
					str += '<span class="spa address">' + addressBook[n].address + '</span>';
					str += '<span class="del"><button href="#" id="no" value="'+no+'"class="delbutton">Delete</button></span>';
					str += '<span class="edt"><button href="#" id="no" value="'+no+'"class="edtbutton">Edit</button></span>';
					str += '</div>';

					addBookDiv.innerHTML += str;
			}
		}
	}
	showAddressBook();
