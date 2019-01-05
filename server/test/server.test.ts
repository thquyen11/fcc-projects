import * as fetch from 'node-fetch';
import * as server from '../src/server';



it('call swapi to get people', ()=>{
    expect.assertions(1);
    // without keyword return, jest will finish when it has the PENDING return from server.getPeople()
    // with keyword return, jest will wait until it has the correct retrun from expect*.toEqual()
    return server.getPeople(fetch).then((data:any)=>{
        expect(data.count).toEqual(87);
    })
})

// mock the fetch call to speed up testing
it('mock call swapi to get people', ()=>{
    const mockFetch:any = jest.fn().mockReturnValue(
        Promise.resolve({
            json: ()=> Promise.resolve({
                count: 89,
                results: [0,1,2,3,4,5]
            })
        })
    )

    expect.assertions(3);
    return server.getPeople(mockFetch).then((data:any)=>{
        expect(data.count).toEqual(89);
        expect(data.results.length).toBeGreaterThan(5);
        expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
    })
})