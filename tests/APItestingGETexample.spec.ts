import {test, request, expect} from "@playwright/test";

// Creating the base url outside the method which can be use in any method
let reqContext2 : any
test.beforeAll("Before All the Test", async()=>{
    reqContext2 = await request.newContext({
        baseURL :"https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            Accept :"application/json"
        }
    
    })
})

test("APT testing Get Practice", async ({request})=>{

    // GET methond API Testing with passing base url and header within the method 
const response1 = await request.get("https://restful-booker.herokuapp.com/booking",
    {
    headers:{
        Accept:"application/json"
    }
    }
);
console.log(await response1.json());
})

test("APT testing Get Practice 2", async ({})=>{
    // GET methond API Testing with passing base url and header within the method by creating the context
const reqContext = await request.newContext({
    baseURL : "https://restful-booker.herokuapp.com ", 
    extraHTTPHeaders:{
        Accept : "application/json"
    }
})

const resp2 = await reqContext.get("/booking");
console.log(await resp2.json());

})

test("API testing Get Practice 3", async()=>{
// using base url and header which is created as objected ouside the method at the top 
    const resp3 = await reqContext2.get("/booking")
    console.log(await resp3.json())
})


// below we have given base url and Headers in Playwright.config file for using it globally
test("API Testing Get Practice 4", async({request}) =>{

const resp4 = await request.get("/booking");
console.log(await resp4.json());

}
)

// Example to find with booking details with path parameter i.e ID

test("API Testing Get Practice 5", async({request}) =>{

const resp5 = await request.get("/booking/100");
console.log(await resp5.json());

}
)

// Example To find with booking details with is query parameter i.e firstname and lastname

test("API Testing Get Practice 6", async({request}) =>{

const resp5 = await request.get("/booking?firstname=Josh&lastname=Allen");
console.log(await resp5.json());

}
)

// Example 2 To find with booking details with is query parameter i.e firstname and lastname

test("API Testing Get Practice 7", async({request}) =>{

const resp5 = await request.get("/booking",
    {
        params :{
            firstname:"Josh",
            lastname:"Allen"
        }
    }
   );
console.log(await resp5.json());

}
)


// Example to add assersations for the Get API 

test("API Testing Get Practice with Assersation", async({request}) =>{

const resp8 = await request.get("/booking/100");
console.log(await resp8.json());

// assersation with status code
expect(resp8.status()).toBe(200);
// assersation with the status 
expect(resp8.ok()).toBeTruthy();

// assersation with the response
expect(await(resp8.json())).toMatchObject({
  firstname: 'John',
  lastname: 'Smith',
  totalprice: 111,
  depositpaid: true,
  bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
  additionalneeds: 'Breakfast'
})

const jsonresp= await resp8.json();
expect( jsonresp.firstname).toEqual("John")

}
)


// To validate the API Get call with UI 

test ('API with UI Verification', async({request, page})=>{

     const resp2 = await request.get("https://api.demoblaze.com/entries");
    
    const jsonresp2 = await resp2.json();

    console.log(jsonresp2.Items[0].title);


    await page.goto("https://www.demoblaze.com")

   await expect(page.getByRole('link', { name: "Samsung galaxy s6" })).toHaveText(jsonresp2.Items[0].title);


})
