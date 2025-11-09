const { usersInfoService, usersInfoUpdateService, usersInfoDeleteService } = require("../../service/user/user.service");

exports.usersInfoController = async (req, res) => {
  try {
    const result = await usersInfoService(req.params.id)

    res.status(200).send(result)
  } catch (error) {
    res.send({ error: error.message });
  }
} 

// ==============================================================

exports.usersInfoUpdateController = async (req, res) => {
 
  try {
    const result = await usersInfoUpdateService({paramID :req.params.id, updatingData: req.body})
    
      res.send({ message: "Update Success." });
  } catch (error) {
    res.send({ message: error });
  }
}

// =======================================================

exports.usersInfoDeleteController =  async (req, res) => {

  try {
    const result = await usersInfoDeleteService(req.params.id)
   
      res.send({ message: "Deleted successfully." , ID : result});
    
  } catch (error) {
    res.send({ message: error });
  }
}