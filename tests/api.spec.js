import { test, expect } from '@playwright/test';

test.describe.serial('API-тесты для Restful-booker @api', ()=>{
    const baseURL = 'https://restful-booker.herokuapp.com';
    let bookingId;
    let postData;
    let authToken;
    let updateData;

    test('Создание бронирования', async ({request})=>{
        postData = {
            "firstname" : "Anastasiya",
            "lastname" : "Grey",
            "totalprice" : 240,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2026-05-12",
                "checkout" : "2026-06-14"
            },
            "additionalneeds" : "Wi-Fi"
        };

        const response = await request.post(`${baseURL}/booking`,{
            data: postData,
        });

        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.bookingid).toBeDefined();
        bookingId = body.bookingid;
        expect(body.booking).toMatchObject(postData);
    });

    test('Получение списка ID бронирований', async ({request})=>{
        expect(bookingId).toBeDefined();

        const response = await request.get(`${baseURL}/booking/${bookingId}`);

        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toMatchObject(postData);
    });

    test('Обновление бронирования', async ({request})=>{
        expect(bookingId).toBeDefined();
        const authResponse = await request.post(`${baseURL}/auth`,{
            data: {
                username: "admin",
                password: "password123",
            }
        });

        const authBody = await authResponse.json();
        authToken = authBody.token;

        updateData = {
            "firstname" : "Alina",
            "lastname" : "Grey",
            "totalprice" : 500,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2026-05-12",
                "checkout" : "2026-06-14"
            },
            "additionalneeds" : "Wi-Fi"
        };

        const response = await request.put(`${baseURL}/booking/${bookingId}`,{
            headers: {
                "Cookie": `token=${authToken}`
            },
            data: updateData
        });

        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toMatchObject(updateData);
    });

    test('Удаление бронирования', async({request})=>{
        expect(bookingId).toBeDefined();
        expect(authToken).toBeDefined();

        const response = await request.delete(`${baseURL}/booking/${bookingId}`,{
            headers: {
                "Cookie": `token=${authToken}`
            }
        });

        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(201);

        const responseGet = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(responseGet.status()).toBe(404);

    });
});
