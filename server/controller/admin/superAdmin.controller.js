const { superAdminCreateService,superAdminUpdateService,superAdminDeleteService } = require("../../service/admin/superAdmin.service");


exports.superAdminCreateController = async (req, res) => {  

  try {
    const result = await superAdminCreateService({adminBody:req.body })
      res.send({ message: "admin add successfully." });
  } catch (error) {
    res.send({ message: error });
  }
}
// ================================================

exports.superAdminUpdateController = async (req, res) => {
    
    try {
    const result = await superAdminUpdateService({paramID:req.params.id, updatingData:req.body })
      res.send({ message: "Update admin Success." });
    
  } catch (error) {
    res.send({ message: error });
  }
}
// ===============================================

exports.superAdminDeleteController =  async (req, res) => {

  try {
    const result = await superAdminDeleteService({paramID:req.params.id})
      res.send({ message: "admin Deleted successfully."});
  } catch (error) {
    res.send({ message: error });
  }
}