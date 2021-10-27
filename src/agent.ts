import {COMPOUND_COMPTROLLER_ADDRESS, BLACKLISTED_ADDRESSES} from './constants'
import { 
  Finding,  
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType 
} from 'forta-agent'

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  if (txEvent.to !== COMPOUND_COMPTROLLER_ADDRESS) return findings;

  const blacklistedAddress = Object.keys(txEvent.addresses).find(address => BLACKLISTED_ADDRESSES[address])
  if (!blacklistedAddress) return findings


  findings.push(
    Finding.fromObject({
      name: "Compound Blacklisted Address",
      description: `Transaction involving a blacklisted address: ${blacklistedAddress}`,
      alertId: "BLACKLIST-COMP-FORTA-1",
      type: FindingType.Suspicious,
      severity: FindingSeverity.Medium,
      protocol: 'Compound',
      metadata: {
        address: blacklistedAddress
      }
    }
  ))
  return findings
}

export default {
  handleTransaction
};