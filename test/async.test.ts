import { wait } from "../src"

describe("async Tests", () => {
    test("1_Promise code block, execution order", async () => {
        let log = ""
        // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-unused-vars
        const p = new Promise(async (resolve, reject) => {
            log += "startResolve:"
            await wait(100)
            log += "preResolve:"
            resolve("Resolved")
            log += "afterResolve:"
            await wait(100)
            log += "endResolve:"
        })
        log += "preAwait:"
        const r = await p
        log += "postAwait:"
        expect(log).toBe("startResolve:preAwait:preResolve:afterResolve:postAwait:")
        expect(r).toBe("Resolved")
        // Notes:
        // - "startResolve" happens at Promise constructor time, before awaiting the constructed Promise.
        // - "endResolve" is missing. Any code after the last async in the promise executor function silently fails to run. Ever.
    })
        
    test.skip("2_Promise code block, with throw", async () => {
        try {
        let log = ""
        // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-unused-vars
        const p2 = new Promise(async (resolve, reject) => {
            log += "startResolve:"
            await wait(100)
            log += "preResolve:"
            resolve("Resolved")
            log += "afterResolve:"
            throw new Error("oops")
            await wait(100)
            log += "endResolve:"
        })
        log += "preAwait:"
        const r2 = await p2
        log += "postAwait:"
        // With breakpoint on `await p2`
        expect(log).toBe("startResolve:preAwait:endResolve:preResolve:afterResolve:postAwait:")
        expect(r2).toBe("Resolved")
        // Notes:
        // - "endResolve" gets added! BEFORE "preResolve" and "afterResolve"!!
        // - The Error silently disappears.
        //
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            expect(e.message).toBe("oops")
            // Until here... ?? Nope...
        }
        // This test neither fails nor succeeds due to the throw in the Promise executor function.
    })
    
    test("3_Promise code block, try catch with throw", async () => {
        let log = ""
        // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-unused-vars
        const p3 = new Promise(async (resolve, reject) => {
            try {
                log += "startResolve:"
                await wait(100)
                log += "preResolve:"
                resolve("Resolved")
                log += "afterResolve:"
                throw new Error("oops")
                await wait(100)
                log += "endResolve:"
            } catch (e) {
                log += "preReject:"
                reject(e)
                log += "afterReject:"
            }
        })
        log += "preAwait:"
        const r3 = await p3
        log += "postAwait:"
        expect(log).toBe("startResolve:preAwait:preResolve:afterResolve:preReject:afterReject:postAwait:")
        expect(r3).toBe("Resolved")
        // Notes:
        // - With a try catch around the async executor function result is still "Resolved"
        // - The throw can be caught and handled but it cannot be propagated to the context of the awaited promise.
    })

    async function thrower() : Promise<void> {
        await wait(10)
        throw new Error("throwerThrew")
    }

    test("4_Promise code block, try catch with await throw", async () => {
        let log = ""
        // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-unused-vars
        const p4 = new Promise(async (resolve, reject) => {
            try {
                log += "startResolve:"
                await wait(100)
                log += "preResolve:"
                resolve("Resolved")
                log += "afterResolve:"
                await thrower()
                await wait(100)
                log += "endResolve:"
            } catch (e) {
                log += "preReject:"
                reject(e)
                log += "afterReject:"
            }
        })
        log += "preAwait:"
        const r4 = await p4
        log += "postAwait:"
        expect(log).toBe("startResolve:preAwait:preResolve:afterResolve:postAwait:")
        expect(r4).toBe("Resolved")
        // Notes:
        // - With a try catch around the async executor function result is still "Resolved"
        // - The async throw silently disqappears.
    })
})