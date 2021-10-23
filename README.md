Please add me as a Agent Developer [Published] on Discord, my username is Vladislav#7601

# Blacklisted Address Agent

## Description

This agent detects transactions that involve blacklisted addresses in Compound protocol

## Supported Chains

- Ethereum
- List any other chains this agent can support e.g. BSC

## Alerts

Describe each of the type of alerts fired by this agent

- BLACKLIST-COMP-FORTA-1
  - Fired when a transaction or subtransaction involves one of the blacklisted addresses
  - Severity is always set to "high"
  - Type is always set to "suspicious"
  - Metadata "address" field specifies which blacklisted address was detected

## Test Data

The agent behaviour can be verified with the following transactions:

- 0xfe35552a3415242045797a8fd43cf5763cd9d922d53888a603922b8f2fc4d376 
- 0x5836e9bc467284cfb74b6085ef017df426c000b362662caabf77aea31f668aa8
- 0x7b3ec85fedf79f6f6b69922d59f24cb0a797afc13d9ec36aacb06cae27fdb3d5

## Automated testing
  Run the command:
- $npm test
