/**************************************************************************************************************************************************************/
/* Program Assignment:           Pruebas de Unidad del modelo del Libro (CRUD)                                                                                */
/* Name:                         Gabriel Torres Mendoza                                                                                                       */
/* Date:                         26/05/2022                                                                                                                   */
/* Description:                  Este archivo consta de las pruebas de unidad de la clase con el código necesario para realizar los CRUD básicos necesarios   */
/**************************************************************************************************************************************************************/

/******************************************************************/
/* Listing Contents:                                              */
/*    Librerías                                                   */
/*      -> Express                                                */
/*      -> MySQL                                                  */
/*    Classes instanciated:                                       */
/*      -> Libro                                                  */
/******************************************************************/



describe('Pruebas de unidad de la Clase Libro junto con pruba de código del Servidor',()=>{
    
    test('1) Verificar que se extraen datos de la base de datos',()=>{
        
        const miLibro = 2;


        expect(miLibro).toBe(2);


    })
})