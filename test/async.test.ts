import { wait } from "../src"

describe("async Tests", () => {
    test.skip("0_execution order in Promise code block", async () => {
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
        await p
        log += "postAwait:"
        expect(log).toBe("startResolve:preAwait:preResolve:afterResolve:postAwait:")
        // Notes:
        // - "startResolve" happens at Promise constructor time, before awaiting the constructed Promise.
        // - "endResolve" is missing. Any code after the last async in the promise executor function silently fails to run. Ever.
        
        try {
        log = ""
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
        await p2
        log += "postAwait:"
        expect(log).toBe("startResolve:preAwait:endResolve:preResolve:afterResolve:postAwait:")
        // Notes:
        // - "endResolve" gets called! BEFORE "preResolve" and "afterResolve"!!
        // - The Error silently disappears.
        //
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            expect(e.message).toBe("oops")
            // Until here... ?? Nope...
        }
        // This test neither fails nor succeeds due to the throw in the Promise executor function.
    })
})