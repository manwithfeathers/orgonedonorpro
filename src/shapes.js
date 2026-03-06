export const ball = {
        width: 120,
        height: 120,
        position: "absolute",
        
        borderRadius: "50%",
        background: "#5dacbd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    }


export const square = {
        width: 120,
        height: 120,
        position: "absolute",
        
        borderRadius: "5%",
        background: "#24527a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    }

export const polygon = {

        height: 120,
        position: "absolute",
        clipPath: "polygon(50% -50%,100% 50%,50% 150%,0 50%)",
        aspectRatio: "1/cos(30deg)",  
        borderRadius: "5%",
        background: "#e0ebeb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
         cursor: "pointer",
    }

export const rhombus = {

    
        width: 120,
        height: 120,
        position: "absolute",
        clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
        
        borderRadius: "5%",
        background: "#a7bcb9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    }