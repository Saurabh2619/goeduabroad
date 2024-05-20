export default function(req, res) {



    if (req.method == "POST") {

        const r = [{ email: 'officialnmn@gmail.com', password: 'Androidapp1@' }, { email: 'vinverma564@gmail.com', password: 'vinverma' }];



        if (r.findIndex(x => x.email == req.body.a.email) != -1) {
            const a = r.findIndex(x => x.email == req.body.a.email);

            if (r[a].password == req.body.a.password) {
                
                res.status(200).json({ logged: true, email: req.body.a.email, message: "Logged in Successfully" })
            } else {

                res.json({ logged: false, message: "Incorrect Password" });
            }
        } else {
            res.json({ logged: false, message: "Email doesn't Exist" })
        }



    } else {
        res.json({
            logged: false,
            message: "Input Error , Please Fill Correct Details"
        })
    }
}