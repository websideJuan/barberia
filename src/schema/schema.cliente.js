export class SchemaCliente {
  constructor(tipe) {
    this.tipe = tipe;
  }

  createSchema() {
    if (this.tipe === 'cliente') {
      return {
        "type": "object",
        "properties": {
          "nombre": {
            "type": "string"
          },
          "apellido": {
            "type": "string"
          },
          "edad": {
            "type": "number"
          },
          "diaAgendado": {
            "type": "string"
          }
        },
        "required": ["nombre", "apellido", "edad", "diaAgendado"]
      };
    
    } else if (this.tipe === 'back') {
      return {
        "type": "object",
        "properties": {
          "nombre": {
            "type": "string"
          },
          "apellido": {
            "type": "string"
          },
          "edad": {
            "type": "number",
            "minimum": 18
          },
          "diaAgendado": {
            "type": "string"
          }
        },
        "required": ["nombre", "apellido", "edad", "diaAgendado"]
      };
    }
  
  }
}
