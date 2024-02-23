const { productService } = require('../repositories/service')

class ProdcutsController {
    constructor(){
        this.productService = productService
    }

    getProducts = async (req,res)=>{
        try{
            const products = await this.productService.getProducts()
            return res.json({
                status: 'succes',
                payload: products
            });
        }catch (error){
            console.error(error);
            res.status(500).send('Server error')
        }
    }

    getProductById = async (req,res)=>{
        try{
            const pid = req.params.pid
            const filteredProduct = await this.productService.getProductById(pid)
            if(filteredProduct){
                res.json({
                    status: 'succes',
                    payload: filteredProduct
                })
            }
            else{
                res.status(404).send("Product not exist")
            }
        }catch(error) {
            console.error(error)
            res.status(500).send('Server error')
        }
    }

    addProduct = async (req,res)=>{
        try {
            const {
              title,
              description,
              price,
              thumbnail,
              code,
              stock,
              status,
              category,
            } = req.body
        
            await this.productService.addProduct(title, description, price, thumbnail, code, stock, status, category)
        
              res.json({
                status: 'success',
                message: 'Producto agragado exitosamente',
              });
            } catch (error) {
              console.error(error);
              res.status(500).send('Server error');
        }
    }

    updateProduct = async (req,res)=>{
        try{
            const pid = req.params.pid
            const {title, description, price, thumbnail, code, stock, status, category} = req.body
            await this.productService.updateProduct(pid, title, description, price, thumbnail, code, stock, status, category)
            res.json({
                status: 'success',
                message: 'Producto actualizado exitosamente',
            })
        }catch(error){
            console.log(error)
            res.status(500).send('server error')
        }
    }

    deleteProduct = async (req,res)=>{
        try{
            const pid = req.params.pid
            const deletedProduct = await this.productService.deleteProduct(pid)

            if (deletedProduct) {
                return res.json({
                    status: 'success',
                    message: 'Producto eliminado exitosamente'
                });
            } else {
                return res.status(404).json({
                    status: 'error',
                    message: 'Producto no encontrado'
            })}
        }catch(error){
            console.log(error);
            res.status(500).send('server error')
        }
    }


}

module.exports = ProdcutsController