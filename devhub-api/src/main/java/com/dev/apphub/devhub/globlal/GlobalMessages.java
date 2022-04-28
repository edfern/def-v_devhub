package com.dev.apphub.devhub.globlal;

public class GlobalMessages {
    // SQL ERROS
    public static final String SQL_TIME_OUT = "Hubo un problema en el repositorio";

    //REPOSITORY USER MESSAGES
    public static final String LINK_USER_TO_REPOSITORY_SUCCESS = "Se ha creado un nuevo repositorio exitosamente";
    public static final String COLLABORATOR_ADDED = "Invitado añadido con exito";
    public static final String ERROR_ADDING_THE_COLLABORATOR = "Error al añadir al invitado";
    public static final String CALLABORATOR_NOT_VALID = " No exixte el usuario que solicita ser invitado";
    public static final String THE_REPOSITORY_DOESNT_EXIST = "No existe un repisitio con ese ID";

    // DATA ERROS
    public static final String NO_DATA_FOUND = "SORRY NO DATA FOUND";
    public static final String SQL_SERVER_ERRORS = "SQL SERVER ERROR";

    // FILE MESSAGES
    public static final String FILE_UPLOADED_SUCCESSFULLY = "El archivo se subio con exito";
    public static final String FILE_IS_NULL = "Se necesita al menos un archivo, o el archivo es nulo";

    // LOGIN ERROS
    public static final String LOGIN_FAIL = "Correo y/o contraseña incorrecta, vuelve a intentarlo.";
    public static final String LOGIN_SUCCESS = "LOGIN SUCCESS";

    // Roles Messages
    public static final String NO_ROLE_SUPPORTED = "El rol no es soportado, roles exixtentes(dueño o invitado)";

    // SUCCES
    public static final String SUCCESS = "SUCCESS";

    // User Messages
    public static final String GET_USER_INFO_FAIL = "Error al obtener informacion de usuario";
    public static final String USER_NOT_FOUND = "No se encontro registro de este usuario";
    public static final String NO_USERS_FOUND_IN_DATA_BASE = "No se encontraron usuarios en la base de datos";

    //Repositories Messages
    public static final String NO_REPO_FOR_THE_USER = "El usuario no contiene ningun repositorio";
    public static final String THE_REPOSITORY_ALREADY_EXIST = "el repositorio ya existe";
    public static final String NO_PUBLIC_REPO_WITH_THAT_NAME = "No existe ningun repositorio publico con ese nombre";
    public static final String NO_EXIST_ANY_REPO_WITH_THAT_NAME = "No existe ningun repositorio con ese nombre";

    //Directory Messages
    public static final String FAIL_TO_CREATE_THE_DIRECTORY = "EL DIRECTORIO NO SE PUDO CREAR";
    public static final String ALREADY_EXIST_A_REPO_WHIT_THAT_NAME = "YA EXIXTE UN REPOSITORIO CON ESE NOMBRE";
    public static final String DIRECTORY_NOT_FOUND = "No se econtro el directorio o no exixte";
    public static final String NO_DIRECTORIES_LIKE_COLLABORATOR = "El usuario no tiene repositorios como invitado";


    // PARAMETERS ERRORS
    public static final String NO_PATAMETERS ="se necesita el parametro:    ";
    public static final String NO_PATAMETERS_DATA ="THE PATAMETER IS EMPTY:    ";

    //PARAMETERS ERRORS CUSTOM
    public static final String NOT_PARAMERS = "Se necesita el campo %s";

    //PARAMETERS MESSAGES
    public static final String NAME = "Nombre";
    public static final String USERNAME = "Username";
    public static final String EMAIL = "Correo electrónico";
    public static final String ID= "id";
    public static final String STUDENT = "estudiante";

    // ERRORS CRUD
    public static final String NOT_PERSON = "No se ha encontrado al %s";


}
