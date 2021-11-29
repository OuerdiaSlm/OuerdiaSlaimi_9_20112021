/**
 * @jest-environment jsdom
 */
 import { fireEvent, screen } from "@testing-library/dom"
 import userEvent from '@testing-library/user-event'
 import BillsUI from "../views/BillsUI.js"
 import { bills } from "../fixtures/bills.js"
 import { ROUTES } from "../constants/routes"
 import Bills from "../containers/Bills.js"
 import { localStorageMock } from "../__mocks__/localStorage.js"
 import DashboardFormUI from "../views/DashboardFormUI.js"
 
 describe("Given I am connected as an employee", () => {
   describe("When I am on Bills Page", () => {
     test("Then bill icon in vertical layout should be highlighted", () => {
       const html = BillsUI({ data: []})
       document.body.innerHTML = html
       //to-do write expect expression
     })
 
     //............................
     describe('When I am on Bills page but back-end send an error message', () => {
      test('Then, Error page should be rendered', () => {
        const html = BillsUI({ error: 'some error message' })
        document.body.innerHTML = html
        expect(screen.getAllByText('Erreur')).toBeTruthy()
      })
    })
    //........
    /*
     describe("When I click in  ", ()=> {
      test("Then function handleClickNewBill is called", ()=>{
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname })
        }
  
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
        }))
      })
    })
    */
 
    //............................
   
     test("Then bills should be ordered from earliest to latest", () => {
       const html = BillsUI({ data: bills })
       document.body.innerHTML = html
       const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
       const antiChrono = (a, b) => ((a < b) ? 1 : -1)
       const datesSorted = [...dates].sort(antiChrono)
       expect(dates).toEqual(datesSorted)
       //console.log(dates+" Les dattes triées")

       
     })
 
     //.....
     /*
    describe('Given I am connected as Employee and I am on Bills page and I clicked on a bill', () => {
      describe('When I click on the icon eye', () => {
        test('A modal should open', () => {
          Object.defineProperty(window, 'localStorage', { value: localStorageMock })
          window.localStorage.setItem('user', JSON.stringify({
            type: 'Employee'
          }))
          const html = DashboardFormUI(bills[0])
          document.body.innerHTML = html
          const onNavigate = (pathname) => {
            document.body.innerHTML = ROUTES({ pathname })
          }
          const handleClickIconEye = jest.fn(Bills.handleClickIconEye)
          const eye = screen.getByTestId('modaleFileTest')
          eye.addEventListener('click', handleClickIconEye)
          userEvent.click(eye)
          expect(handleClickIconEye).toHaveBeenCalled()
 
          const modale = screen.getByTestId('modaleFileTest')
          expect(modale).toBeTruthy()
    
        })
      })
    })
    */
    describe("When I click on new bill button", () => {
      test("Then function handleClickNewBill is called and I navigate to new bill page", () => {
        const html = BillsUI({data:[]})
        document.body.innerHTML = html
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({pathname})
        }
        const bill = new Bills({document, onNavigate, firestore: null, localStorage: window.localStorage,})
        const handleClickNewBill = jest.fn(bill.handleClickNewBill)
        const btnNewBill = screen.getByTestId('btn-new-bill')
        btnNewBill.addEventListener('click', handleClickNewBill)
        userEvent.click(btnNewBill)
        expect(handleClickNewBill).toHaveBeenCalled()
        expect(screen.getByText("Envoyer une note de frais")).toBeTruthy()
      })
    })
    //......
    
   })
 
   
 })
