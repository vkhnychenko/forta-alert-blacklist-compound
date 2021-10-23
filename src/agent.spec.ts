import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent
} from "forta-agent"
import agent from "./agent"
import {COMPOUND_COMPTROLLER_ADDRESS} from './constants'

describe("blacklisted address agent", () => {
  let handleTransaction: HandleTransaction;

  const createTxEventWithAddresses = (addresses: {[addr: string]: boolean}) => createTransactionEvent({
    transaction: {
      hash: '0xfe35552a3415242045797a8fd43cf5763cd9d922d53888a603922b8f2fc4d376',
      to: COMPOUND_COMPTROLLER_ADDRESS} as any,
    receipt: {} as any,
    block: {} as any,
    addresses
  })

  beforeAll(() => {
    handleTransaction = agent.handleTransaction
  })

  describe("handleTransaction", () => {
    it("returns empty findings if no blacklisted address is involved", async () => {
      const txEvent = createTxEventWithAddresses({})

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it("returns a finding if a blacklisted address is involved", async () => {
      const address = "0x6429fee053768ffa90a59cafb98ca9e8f6471211";
      const txEvent = createTxEventWithAddresses({ [address]: true })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Compound Blacklisted Address",
          description: `Transaction involving a blacklisted address: ${address}`,
          alertId: "BLACKLIST-COMP-FORTA-1",
          type: FindingType.Suspicious,
          severity: FindingSeverity.Critical,
          metadata: {
            address: address
          }
        })
      ])
    })
  })
})