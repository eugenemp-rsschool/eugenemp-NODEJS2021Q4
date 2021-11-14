# Ciphering CLI Tool

## Installation

- Clone this repository to your computer by runnig:  
`git clone -b task1-ciphering-cli-tool https://github.com/eugenemp/eugenemp-NODEJS2021Q4.git`  

Notice the 'b' switch! You cloning specific branch so no need to switch it after install

## Usage
- CD into task1-ciphering-cli-tool folder and run my_ciphering_cli with argument listed below  

- CLI tool accept 3 options (short alias and full name):  

    -c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:  

    X is a cipher mark:  
        C is for Caesar cipher (with shift 1)  
        A is for Atbash cipher  
        R is for ROT-8 cipher  
    Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)  
        1 is for encoding  
        0 is for decoding  

    -i, --input: a path to input file  
    -o, --output: a path to output file  

For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"  

- Usage example:  

`$ node cipher-tool -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"`  

    input.txt `This is secret. Message about "_" symbol!`

    output.txt `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

`$ node cipher-tool -c "C1-R1-A" -i "./input.txt" -o "./output.txt"`  

    input.txt `This is SPARTA!`

    output.txt `Xjiy iy YBQZXQ!`
